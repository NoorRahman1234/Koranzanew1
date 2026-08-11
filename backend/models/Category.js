

import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },

  image: {
    type: String,
    default: '/placeholder-category.png'
  },

  description: {
    type: String
  }
}, {
  timestamps: true
});

export const Category = mongoose.model('Category', categorySchema);