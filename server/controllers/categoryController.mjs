import categoryModel from "../models/categoryModel.mjs";

const categoryController = {
  getAll: async (req, res, next) => {
    try {
      const categories = await categoryModel.getAllCategories();
      res.status(200).json({
        status: "success",
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },

  findByName: async (req, res, next) => {
    try {
      const { name } = req.params;
      const category = await categoryModel.findCategoryByName(name);
      if (!category) {
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Category found successfully",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          status: "error",
          message: "Category name is required",
        });
      }

      const existingCategory = await categoryModel.findCategoryByName(name);
      if (existingCategory) {
        return res.status(400).json({
          status: "error",
          message: "Category already exists",
        });
      }

      const newCategory = await categoryModel.createCategory(name);
      res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default categoryController;
