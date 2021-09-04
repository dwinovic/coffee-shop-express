import categoriesModel from '../models/categoriesModel.js';
import { response, responseError } from '../helpers/helpers.js';

const addcategory = async (req, res, next) => {
  try {
    const data = req.body;
    categoriesModel.addcategory(data)
      .then((result) => {
        response(res, 'Success', 200, 'Successfully add category', result);
      })
      .catch((err) => {
        responseError(res, 'Error', 500, 'Failed add category', err);
      });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoriesModel.getCategories();
    if (categories.length > 0) {
      response(res, 'Success', 200, 'All data categories', categories);
    } else {
      response(res, 'NULL', 200, 'There are no categories to display', categories);
    }
  } catch (error) {
    next(error);
  }
};

const showCategory = async (req, res, next) => {
  try {
    const field = req.query.field || 'category_name';
    const fieldValue = req.query.fieldValue || ' ';
    const category = await categoriesModel.showCategory(field, fieldValue);
    if (category.length > 0) {
      response(res, 'Success', 200, 'Category successfully loaded', category);
    } else {
      response(res, 'NULL', 200, `Category with ${field} = ${fieldValue} not found`);
    }
  } catch (error) {
    next(error);
  }
};

const updatecategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    categoriesModel.updateCategory(data, categoryId)
      .then((result) => {
        response(res, 'Success', 200, 'Category successfully updated', result);
      })
      .catch((err) => {
        responseError(res, 'Error', 500, 'Failed update category', err);
      });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const checkExistRelation = await categoriesModel.showRelationCategory(categoryId);
    if (checkExistRelation.length > 0) {
      return responseError(res, 'Error', 422, 'Cant delete! Some products use this category');
    }
    categoriesModel.deleteCategory(categoryId)
      .then((result) => {
        response(res, 'Success', 200, 'Successfully deleted category', result);
      })
      .catch((err) => {
        responseError(res, 'Error', 500, 'Failed delete category', err);
      });
  } catch (error) {
    next(error);
  }
};

export default {
  addcategory,
  getCategories,
  showCategory,
  updatecategory,
  deleteCategory,
};
