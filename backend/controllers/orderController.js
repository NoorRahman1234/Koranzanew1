

import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Customer from '../models/Customer.js'; // 1. Import Customer Model

// Get all orders from MongoDB
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};



export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    console.log("=== INCOMING ORDER PAYLOAD ===", orderData);

    if (!orderData.id) {
      orderData.id = '#' + Date.now().toString().slice(-6);
    }

    if (!orderData.date) {
      orderData.date = new Date().toISOString().split('T')[0];
    }

    const savedOrder = await Order.create(orderData);
    console.log("=== ORDER SAVED TO DB ===", savedOrder);

    const targetEmail = orderData.email;
    const orderAmount = Number(orderData.total || 0);

    console.log(`Searching for Customer with Email: "${targetEmail}" to add total: ${orderAmount}`);

    if (targetEmail) {
      const updatedCustomer = await Customer.findOneAndUpdate(
        { email: { $regex: new RegExp(`^${targetEmail.trim()}$`, "i") } },
        {
          $inc: {
            orders: 1,
            totalSpent: orderAmount
          }
        },
        { new: true }
      );

     

if (updatedCustomer) {
  console.log("=== CUSTOMER UPDATED SUCCESSFULLY ===", updatedCustomer);
} else {
  console.log("=== NO CUSTOMER FOUND - CREATING CUSTOMER ===");

  const newCustomer = await Customer.create({
    id: 'CUST-' + Date.now().toString().slice(-6),
    name: orderData.customer,
    email: orderData.email.trim().toLowerCase(),
    phone: orderData.phone || '',
    orders: 1,
    totalSpent: orderAmount,
    status: 'Active'
  });

  console.log("=== NEW CUSTOMER CREATED ===", newCustomer);
}










    } else {
      console.log("=== WARNING: NO EMAIL PROVIDED IN ORDER PAYLOAD ===");
    }

    res.status(201).json({
      success: true,
      data: savedOrder
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
};





// Update order status in MongoDB
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    // Match either standard MongoDB _id or custom id string
    let query = { id: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { id: id }] };
    }

    const updatedOrder = await Order.findOneAndUpdate(
      query,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found in database'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating status'
    });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    let query = { id: id };
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { id: id }] };
    }

    const deletedOrder = await Order.findOneAndDelete(query);
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting order'
    });
  }
};