import { Category } from '../models/Category.js';

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);

    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};


// Add category
export const createCategory = async (req, res) => {
  try {
    const { name, slug, status } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Category name and slug are required'
      });
    }

    const existingCategory = await Category.findOne({
      $or: [
        { name: name.trim() },
        { slug: slug.trim() }
      ]
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category name or slug already exists'
      });
    }

    const category = await Category.create({
      name: name.trim(),
      slug: slug.trim(),
      status: status || 'Active'
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });

  } catch (error) {
    console.error('Error creating category:', error);

    res.status(500).json({
      success: false,
      message: 'Server error while creating category'
    });
  }
};


// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });

  } catch (error) {
    console.error('Error updating category:', error);

    res.status(500).json({
      success: false,
      message: 'Server error while updating category'
    });
  }
};


// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting category:', error);

    res.status(500).json({
      success: false,
      message: 'Server error while deleting category'
    });
  }
};