import servicesModel from "../models/servicesModel.mjs";
import categoryModel from "../models/categoryModel.mjs";

const servicesController = {
  getAll: async (req, res, next) => {
    try {
      const services = await servicesModel.getAllServices();
      res.status(200).json({
        status: "success",
        message: "Services retrieved successfully",
        data: services,
      });
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const service = await servicesModel.getServiceById(id);
      if (!service) {
        return res.status(404).json({
          status: "error",
          message: "Service not found",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Service retrieved successfully",
        data: service,
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, description, image_url, price, category_name } = req.body;

      if (!name || !category_name) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields (name, price, category_name)",
        });
      }

      let categoryId = await categoryModel.findCategoryByName(category_name);
      if (!categoryId) {
        const newCategory = await categoryModel.createCategory(category_name);
        categoryId = newCategory.id;
      }

      const newService = await servicesModel.createService({
        name,
        description,
        image_url,
        price,
        category_name,
      });

      res.status(201).json({
        status: "success",
        message: "Service created successfully",
        data: newService,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, image_url, price, category_name } = req.body;

      if (!name || !price || !category_name) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields (name, category_name)",
        });
      }

      let categoryId = await categoryModel.findCategoryByName(category_name);
      if (!categoryId) {
        const newCategory = await categoryModel.createCategory(category_name);
        categoryId = newCategory.id;
      }

      const updatedService = await servicesModel.updateService(id, {
        name,
        description,
        image_url,
        price,
        category_name,
      });

      if (!updatedService) {
        return res.status(404).json({
          status: "error",
          message: "Service not found or could not be updated",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Service updated successfully",
        data: updatedService,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedService = await servicesModel.deleteService(id);
      if (!deletedService) {
        return res.status(404).json({
          status: "error",
          message: "Service not found or could not be deleted",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Service deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default servicesController;
