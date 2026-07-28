import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number
});

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  items: [orderItemSchema]
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
