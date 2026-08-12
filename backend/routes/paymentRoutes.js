import express from 'express';

import {
  getPayments,
  createPayment,
  updatePayment
} from '../controllers/paymentController.js';

const router = express.Router();

// Get all payments
router.get('/', getPayments);

// Create a payment
router.post('/', createPayment);
router.put('/:id', updatePayment);

export default router;