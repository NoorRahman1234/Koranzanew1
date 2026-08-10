
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
  email: String,
  phone: String,
  address: String,
  city: String,
  postalCode: String,
  date: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true,
    default: 0
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

// Auto-calculate total from items if not provided (Sync Hook Fix)
orderSchema.pre('validate', function () {
  if ((!this.total || this.total === 0) && this.items && this.items.length > 0) {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;