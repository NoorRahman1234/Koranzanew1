import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },

  orderId: {
    type: String,
    required: true
  },

  customer: {
    type: String,
    required: true
  },

  email: {
    type: String
  },

  amount: {
    type: Number,
    required: true,
    default: 0
  },

  method: {
    type: String,
    enum: [
      'Cash on Delivery',
      'JazzCash',
      'Easypaisa',
      'Bank Transfer',
      'Raast'
    ],
    required: true
  },

  status: {
    type: String,
    enum: [
      'Pending',
      'Completed',
      'Failed',
      'Refunded'
    ],
    default: 'Pending'
  },

  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;