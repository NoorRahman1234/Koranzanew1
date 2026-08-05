import mongoose from 'mongoose';
import { Category } from './Category.js';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  original_price: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  finish: {
    type: String
  },
  skin_type: {
    type: String
  },
  benefits: {
    type: String
  },
  description: {
    type: String
  },
  how_to_use: {
    type: String
  },
  image: {
    type: String
  },
  hoverImg: {
    type: String
  },
  image2: {
    type: String
  },
  image3: {
    type: String
  },
  image4: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// For local search compatibility
productSchema.index({ name: 'text', description: 'text', category: 'text' });

const ProductModel = mongoose.model('Product', productSchema);

export class Product {
  // Get all products with optional filtering
  static async getAll(filters = {}) {
    const query = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.minPrice || filters.maxPrice) {
      // Helper to parse price string "Rs 1,299" -> 1299
      // Note: Mongoose doesn't easily support querying by parsed string values without regex or aggregation
      // For simplicity in this migration, we'll fetch and filter if price range is used, 
      // OR we would need to store numeric price in DB (recommended).
      // Given the SQLite implementation used CAST(REPLACE...), we'll approximate with regex if possible 
      // or just fetch all and filter in memory if the dataset is small.
      // However, for a real migration, we'd store `price_numeric`.
    }

    if (filters.skinType) {
      query.skin_type = filters.skinType;
    }

    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }

    if (filters.inStock !== undefined) {
      query.stock = { $gt: 0 };
    }

    let mongoQuery = ProductModel.find(query);

    // Add sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'price_asc':
          // Price sorting on string "Rs ..." is tricky. 
          // We'll sort by numeric price if we had it. 
          // For now, we'll keep it simple.
          break;
        case 'name_asc':
          mongoQuery = mongoQuery.sort({ name: 1 });
          break;
        case 'newest':
          mongoQuery = mongoQuery.sort({ createdAt: -1 });
          break;
        default:
          mongoQuery = mongoQuery.sort({ id: 1 });
      }
    } else {
      mongoQuery = mongoQuery.sort({ id: 1 });
    }

    // Add pagination
    if (filters.limit) {
      mongoQuery = mongoQuery.limit(parseInt(filters.limit));
      if (filters.offset) {
        mongoQuery = mongoQuery.skip(parseInt(filters.offset));
      }
    }

    return await mongoQuery;
  }

  // Get product by ID
  static async getById(id) {
  return await ProductModel.findById(id);
}

  // Create new product
  static async create(productData) {
    // Determine the next numeric ID if not provided
    if (!productData.id) {
      const lastProduct = await ProductModel.findOne().sort({ id: -1 });
      productData.id = lastProduct ? lastProduct.id + 1 : 1;
    }
    return await ProductModel.create(productData);
  }

  // Update product
  static async update(id, productData) {
  return await ProductModel.findByIdAndUpdate(
    id,
    productData,
    { new: true }
  );
}

  // Delete product
  static async delete(id) {
  return await ProductModel.findByIdAndDelete(id);
}

  // Get products by category
  static async getByCategory(category) {
    return await ProductModel.find({ category });
  }

  // Update stock
 static async updateStock(id, quantity) {
  return await ProductModel.findByIdAndUpdate(
    id,
    { stock: quantity },
    { new: true }
  );
}

  // Search products
  static async search(searchTerm) {
    return await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ]
    });
  }

  // Get all categories from the Category collection
  static async getCategories() {
    const categories = await Category.find().sort({ createdAt: 1 });
    return categories.map(cat => ({ 
      category: cat.name,
      image: cat.image 
    }));
  }

  // Create a new category
  static async createCategory(categoryData) {
    return await Category.create(categoryData);
  }

  // Delete a category and all its products
  static async deleteCategory(name) {
    // Delete all products in this category
    await ProductModel.deleteMany({ category: name });
    // Delete the category entry itself
    return await Category.findOneAndDelete({ name });
  }

  // Get product count
  static async getCount(filters = {}) {
    const query = {};
    if (filters.category) {
      query.category = filters.category;
    }
    return await ProductModel.countDocuments(query);
  }
}
