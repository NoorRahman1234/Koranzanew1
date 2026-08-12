import Payment from '../models/Payment.js';
import mongoose from 'mongoose';
// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    console.error("Error getting payments:", error);

    res.status(500).json({
      success: false,
      message: 'Server error while fetching payments'
    });
  }
};


// Create a payment
export const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;

    // Generate transaction ID if it is not provided
    if (!paymentData.transactionId) {
      paymentData.transactionId =
        'TRX-' + Date.now().toString().slice(-8);
    }

    // Generate date if it is not provided
    if (!paymentData.date) {
      paymentData.date = new Date().toISOString().split('T')[0];
    }

    const payment = await Payment.create(paymentData);

    console.log("=== PAYMENT SAVED TO DB ===", payment);

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: payment
    });

  } catch (error) {
    console.error("Error creating payment:", error);

    res.status(500).json({
      success: false,
      message: 'Server error while creating payment'
    });
  }
};



// Update payment status
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      'Pending',
      'Completed',
      'Failed',
      'Refunded'
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    let query;

    // If the value is a valid MongoDB ObjectId,
    // allow updating by _id as well.
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = {
        $or: [
          { _id: id },
          { transactionId: id }
        ]
      };
    } else {
      // Otherwise treat it as transactionId only.
      query = {
        transactionId: id
      };
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      query,
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Payment status updated successfully',
      data: updatedPayment
    });

  } catch (error) {
    console.error("Error updating payment:", error);

    return res.status(500).json({
      success: false,
      message: 'Server error while updating payment'
    });
  }
};