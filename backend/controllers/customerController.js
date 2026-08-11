

import Customer from '../models/Customer.js';

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const createCustomer = async (req, res) => {
  try {
    const customerData = req.body;

    // Check if customer already exists with this email
    const existingCustomer = await Customer.findOne({
      email: customerData.email.trim().toLowerCase()
    });

    if (existingCustomer) {
      return res.status(200).json({
        success: true,
        data: existingCustomer,
        message: 'Customer already exists'
      });
    }

    // Safely auto-generate ID by finding the latest customer ID in DB
    if (!customerData.id) {
      const lastCustomer = await Customer.findOne().sort({ createdAt: -1 });
      let nextNumber = 1;

      if (lastCustomer && lastCustomer.id) {
        const lastNum = parseInt(lastCustomer.id.replace(/\D/g, ""), 10);

        if (!isNaN(lastNum)) {
          nextNumber = lastNum + 1;
        }
      }

      customerData.id = 'C' + String(nextNumber).padStart(3, '0');
    }

    const customer = await Customer.create(customerData);

    res.status(201).json({
      success: true,
      data: customer
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};





export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOneAndUpdate({ id }, req.body, { new: true });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOneAndDelete({ id });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.status(200).json({ success: true, message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};