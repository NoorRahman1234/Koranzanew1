// import { Product } from '../models/Product.js';
// import fs from 'fs';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Get all products with filtering and pagination
// export const getAllProducts = async (req, res, next) => {
//   try {
//     const {
//       category,
//       minPrice,
//       maxPrice,
//       skinType,
//       search,
//       sort,
//       limit,
//       page
//     } = req.query;

//     const filters = {};
//     if (category) filters.category = category;
//     if (minPrice) filters.minPrice = minPrice;
//     if (maxPrice) filters.maxPrice = maxPrice;
//     if (skinType) filters.skinType = skinType;
//     if (search) filters.search = search;
//     if (sort) filters.sort = sort;

//     // Pagination
//     if (limit) {
//       filters.limit = parseInt(limit);
//       if (page) {
//         filters.offset = (parseInt(page) - 1) * filters.limit;
//       }
//     }

//     const products = await Product.getAll(filters);

//     res.json({
//       success: true,
//       count: products.length,
//       data: products
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get single product by ID
// export const getProductById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.getById(id);

//     if (!product) {
//       const error = new Error('Product not found');
//       error.status = 404;
//       throw error;
//     }

//     res.json({
//       success: true,
//       data: product
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get products by category
// export const getProductsByCategory = async (req, res, next) => {
//   try {
//     const { category } = req.params;
//     const products = await Product.getByCategory(category);

//     res.json({
//       success: true,
//       count: products.length,
//       data: products
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Create new product
// export const createProduct = async (req, res, next) => {
//   try {
//     const {
//       name,
//       category,
//       price,
//       original_price,
//       stock,
//       finish,
//       skin_type,
//       benefits,
//       description,
//       how_to_use
//     } = req.body;

//     // Note: Required fields are now validated by middleware in routes

//     // Handle images
//     let imagePath = null;
//     let hoverImgPath = null;
//     let image2Path = null;
//     let image3Path = null;
//     let image4Path = null;

//     if (req.files) {
//       if (req.files['image']) imagePath = `/uploads/${req.files['image'][0].filename}`;
//       if (req.files['hoverImg']) hoverImgPath = `/uploads/${req.files['hoverImg'][0].filename}`;
//       if (req.files['image2']) image2Path = `/uploads/${req.files['image2'][0].filename}`;
//       if (req.files['image3']) image3Path = `/uploads/${req.files['image3'][0].filename}`;
//       if (req.files['image4']) image4Path = `/uploads/${req.files['image4'][0].filename}`;
//     } else if (req.file) {
//       imagePath = `/uploads/${req.file.filename}`;
//     }

//     const productData = {
//       name,
//       category,
//       price,
//       original_price,
//       stock: stock || 0,
//       finish,
//       skin_type,
//       benefits,
//       description,
//       how_to_use,
//       image: imagePath,
//       hoverImg: hoverImgPath,
//       image2: image2Path,
//       image3: image3Path,
//       image4: image4Path
//     };

//     const product = await Product.create(productData);

//     res.status(201).json({
//       success: true,
//       message: 'Product created successfully',
//       data: product
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update product
// export const updateProduct = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       category,
//       price,
//       original_price,
//       stock,
//       finish,
//       skin_type,
//       benefits,
//       description,
//       how_to_use
//     } = req.body;

//     // Check if product exists
//     const existingProduct = await Product.getById(id);
//     if (!existingProduct) {
//       const error = new Error('Product not found');
//       error.status = 404;
//       throw error;
//     }

//     // Handle image update
//     let imagePath = existingProduct.image;
//     let hoverImgPath = existingProduct.hoverImg;
//     let image2Path = existingProduct.image2;
//     let image3Path = existingProduct.image3;
//     let image4Path = existingProduct.image4;

//     if (req.files) {
//       if (req.files['image']) {
//         if (existingProduct.image) {
//           const oldPath = join(__dirname, '..', 'uploads', existingProduct.image.split('/').pop());
//           if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//         }
//         imagePath = `/uploads/${req.files['image'][0].filename}`;
//       }
//       if (req.files['hoverImg']) {
//         if (existingProduct.hoverImg) {
//           const oldPath = join(__dirname, '..', 'uploads', existingProduct.hoverImg.split('/').pop());
//           if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//         }
//         hoverImgPath = `/uploads/${req.files['hoverImg'][0].filename}`;
//       }
//       if (req.files['image2']) {
//         if (existingProduct.image2) {
//           const oldPath = join(__dirname, '..', 'uploads', existingProduct.image2.split('/').pop());
//           if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//         }
//         image2Path = `/uploads/${req.files['image2'][0].filename}`;
//       }
//       if (req.files['image3']) {
//         if (existingProduct.image3) {
//           const oldPath = join(__dirname, '..', 'uploads', existingProduct.image3.split('/').pop());
//           if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//         }
//         image3Path = `/uploads/${req.files['image3'][0].filename}`;
//       }
//       if (req.files['image4']) {
//         if (existingProduct.image4) {
//           const oldPath = join(__dirname, '..', 'uploads', existingProduct.image4.split('/').pop());
//           if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//         }
//         image4Path = `/uploads/${req.files['image4'][0].filename}`;
//       }
//     } else if (req.file) {
//       if (existingProduct.image) {
//         const oldImagePath = join(__dirname, '..', 'uploads', existingProduct.image.split('/').pop());
//         if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
//       }
//       imagePath = `/uploads/${req.file.filename}`;
//     }

//     const productData = {
//       name,
//       category,
//       price,
//       original_price,
//       stock,
//       finish,
//       skin_type,
//       benefits,
//       description,
//       how_to_use,
//       image: imagePath,
//       hoverImg: hoverImgPath,
//       image2: image2Path,
//       image3: image3Path,
//       image4: image4Path
//     };

//     const product = await Product.update(id, productData);

//     res.json({
//       success: true,
//       message: 'Product updated successfully',
//       data: product
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete product
// export const deleteProduct = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     // Check if product exists
//     const product = await Product.getById(id);
//     if (!product) {
//       const error = new Error('Product not found');
//       error.status = 404;
//       throw error;
//     }

//     // Delete image if exists
//     if (product.image) {
//       const imagePath = join(__dirname, '..', 'uploads', product.image.split('/').pop());
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//       }
//     }

//     await Product.delete(id);

//     res.json({
//       success: true,
//       message: 'Product deleted successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Search products
// export const searchProducts = async (req, res, next) => {
//   try {
//     const { q } = req.query;

//     if (!q) {
//       const error = new Error('Search query is required');
//       error.status = 400;
//       throw error;
//     }

//     const products = await Product.search(q);

//     res.json({
//       success: true,
//       count: products.length,
//       data: products
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all categories
// export const getCategories = async (req, res, next) => {
//   try {
//     const categories = await Product.getCategories();

//     res.json({
//       success: true,
//       data: categories
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Create a new category
// export const createCategory = async (req, res, next) => {
//   try {
//     const { name, description } = req.body;

//     if (!name) {
//       const error = new Error('Category name is required');
//       error.status = 400;
//       throw error;
//     }

//     // Handle image
//     let imagePath = '/placeholder-category.png';
//     if (req.file) {
//       imagePath = `/uploads/${req.file.filename}`;
//     }

//     const categoryData = {
//       name,
//       description,
//       image: imagePath
//     };

//     const category = await Product.createCategory(categoryData);

//     res.status(201).json({
//       success: true,
//       message: 'Category created successfully',
//       data: category
//     });
//   } catch (error) {
//     // Handle duplicate key error for name
//     if (error.code === 11000) {
//       error.message = 'Category name already exists';
//       error.status = 400;
//     }
//     next(error);
//   }
// };

// // Delete a category and all its products
// export const deleteCategory = async (req, res, next) => {
//   try {
//     const { name } = req.params;

//     if (!name) {
//       const error = new Error('Category name is required');
//       error.status = 400;
//       throw error;
//     }

//     const category = await Product.deleteCategory(name);

//     if (!category) {
//       const error = new Error('Category not found');
//       error.status = 404;
//       throw error;
//     }

//     res.json({
//       success: true,
//       message: `Category '${name}' and all its products deleted successfully`
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update product stock
// export const updateStock = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { stock } = req.body;

//     // Note: Validation is now primarily handled by middleware

//     const product = await Product.getById(id);
//     if (!product) {
//       const error = new Error('Product not found');
//       error.status = 404;
//       throw error;
//     }

//     await Product.updateStock(id, stock);
//     const updatedProduct = await Product.getById(id);

//     res.json({
//       success: true,
//       message: 'Stock updated successfully',
//       data: updatedProduct
//     });
//   } catch (error) {
//     next(error);
//   }
// };














import { Product } from '../models/Product.js';

// Get all products with filtering and pagination
export const getAllProducts = async (req, res, next) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      skinType,
      search,
      sort,
      limit,
      page
    } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (skinType) filters.skinType = skinType;
    if (search) filters.search = search;
    if (sort) filters.sort = sort;

    // Pagination
    if (limit) {
      filters.limit = parseInt(limit);
      if (page) {
        filters.offset = (parseInt(page) - 1) * filters.limit;
      }
    }

    const products = await Product.getAll(filters);

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Get single product by ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Get products by category
export const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Product.getByCategory(category);

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Create new product
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      original_price,
      stock,
      finish,
      skin_type,
      benefits,
      description,
      how_to_use
    } = req.body;

    // Handle Cloudinary Image URLs
    let imagePath = null;
    let hoverImgPath = null;
    let image2Path = null;
    let image3Path = null;
    let image4Path = null;

    if (req.files) {
      if (req.files['image']) imagePath = req.files['image'][0].path;
      if (req.files['hoverImg']) hoverImgPath = req.files['hoverImg'][0].path;
      if (req.files['image2']) image2Path = req.files['image2'][0].path;
      if (req.files['image3']) image3Path = req.files['image3'][0].path;
      if (req.files['image4']) image4Path = req.files['image4'][0].path;
    } else if (req.file) {
      imagePath = req.file.path;
    }

    const productData = {
      name,
      category,
      price,
      original_price,
      stock: stock || 0,
      finish,
      skin_type,
      benefits,
      description,
      how_to_use,
      image: imagePath,
      hoverImg: hoverImgPath,
      image2: image2Path,
      image3: image3Path,
      image4: image4Path
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      price,
      original_price,
      stock,
      finish,
      skin_type,
      benefits,
      description,
      how_to_use
    } = req.body;

    // Check if product exists
    const existingProduct = await Product.getById(id);
    if (!existingProduct) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    // Keep existing Cloudinary URLs unless new ones are uploaded
    let imagePath = existingProduct.image;
    let hoverImgPath = existingProduct.hoverImg;
    let image2Path = existingProduct.image2;
    let image3Path = existingProduct.image3;
    let image4Path = existingProduct.image4;

    if (req.files) {
      if (req.files['image']) imagePath = req.files['image'][0].path;
      if (req.files['hoverImg']) hoverImgPath = req.files['hoverImg'][0].path;
      if (req.files['image2']) image2Path = req.files['image2'][0].path;
      if (req.files['image3']) image3Path = req.files['image3'][0].path;
      if (req.files['image4']) image4Path = req.files['image4'][0].path;
    } else if (req.file) {
      imagePath = req.file.path;
    }

    const productData = {
      name,
      category,
      price,
      original_price,
      stock,
      finish,
      skin_type,
      benefits,
      description,
      how_to_use,
      image: imagePath,
      hoverImg: hoverImgPath,
      image2: image2Path,
      image3: image3Path,
      image4: image4Path
    };

    const product = await Product.update(id, productData);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const product = await Product.getById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    await Product.delete(id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Search products
export const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      const error = new Error('Search query is required');
      error.status = 400;
      throw error;
    }

    const products = await Product.search(q);

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.getCategories();

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// Create a new category
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      const error = new Error('Category name is required');
      error.status = 400;
      throw error;
    }

    // Handle Cloudinary image for category
    let imagePath = 'https://res.cloudinary.com/demo/image/upload/sample.jpg'; // default image URL or placeholder URL
    if (req.file) {
      imagePath = req.file.path;
    }

    const categoryData = {
      name,
      description,
      image: imagePath
    };

    const category = await Product.createCategory(categoryData);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = 'Category name already exists';
      error.status = 400;
    }
    next(error);
  }
};

// Delete a category and all its products
export const deleteCategory = async (req, res, next) => {
  try {
    const { name } = req.params;

    if (!name) {
      const error = new Error('Category name is required');
      error.status = 400;
      throw error;
    }

    const category = await Product.deleteCategory(name);

    if (!category) {
      const error = new Error('Category not found');
      error.status = 404;
      throw error;
    }

    res.json({
      success: true,
      message: `Category '${name}' and all its products deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};

// Update product stock
export const updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.getById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    await Product.updateStock(id, stock);
    const updatedProduct = await Product.getById(id);

    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
};