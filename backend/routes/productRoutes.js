import express from 'express';
import { body, query, param } from 'express-validator';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getCategories,
  createCategory,
  deleteCategory,
  updateStock
} from '../controllers/productController.js';
import { upload } from '../middleware/upload.js';
import { validate } from '../middleware/validation.js';

const router = express.Router();

// Validation Rules
const productValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').trim().notEmpty().withMessage('Price is required'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
];

const updateValidation = [
  param('id').isInt().withMessage('Invalid product ID'),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('price').optional().trim().notEmpty().withMessage('Price cannot be empty'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
];

const stockValidation = [
  param('id').isInt().withMessage('Invalid product ID'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
];

// Public routes - Get products
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/categories', getCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/categories', upload.single('image'), createCategory);
router.delete('/categories/:name', deleteCategory);

const cpUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'hoverImg', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]);

// Admin routes - Create, Update, Delete products
router.post('/', cpUpload, validate(productValidation), createProduct);
router.put('/:id', cpUpload, validate(updateValidation), updateProduct);
router.delete('/:id', param('id').isInt(), validate([]), deleteProduct);
router.patch('/:id/stock', validate(stockValidation), updateStock);

export default router;
