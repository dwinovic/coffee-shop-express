import categoriesModel from '../models/categoriesModel.js';
import { response, responseError, responsePagination } from '../helpers/helpers.js';

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
  const StatusPagination = req.query.pagination || 'on';
  const search = req.query.search || '';
  let order = req.query.order || '';
  if (order.toUpperCase() === 'ASC') {
    order = 'ASC';
  } else if (order.toUpperCase() === 'DESC') {
    order = 'DESC';
  } else {
    order = 'DESC';
  }
  let { fieldOrder } = req.query;
  if (fieldOrder) {
    if (fieldOrder.toLowerCase() === 'category_name') {
      fieldOrder = 'category_name';
    } else {
      fieldOrder = 'category_id';
    }
  } else {
    fieldOrder = 'category_id';
  }
  try {
    let categories;
    let pagination;
    const allRecord = await categoriesModel.getCategories(search, order, fieldOrder);
    if (allRecord.length > 0) {
      const limit = req.query.limit || 5;
      const pages = Math.ceil(allRecord.length / limit);
      let page = req.query.page || 1;
      let nextPage = parseInt(page, 10) + 1;
      let prevPage = parseInt(page, 10) - 1;
      if (nextPage > pages) {
        nextPage = pages;
      }
      if (prevPage < 1) {
        prevPage = 1;
      }
      if (page > pages) {
        page = pages;
      } else if (page < 1) {
        page = 1;
      }
      const start = (page - 1) * limit;
      pagination = {
        countData: allRecord.length,
        pages,
        limit: parseInt(limit, 10),
        curentPage: parseInt(page, 10),
        nextPage,
        prevPage,
      };
      if (StatusPagination === 'on') {
        categories = await categoriesModel.getCategories(search, order, fieldOrder, start, limit);
        return responsePagination(res, 'success', 200, 'All categories successfully loaded', categories, pagination);
      }
      categories = await categoriesModel.getCategories(search, order, fieldOrder);
      return response(res, 'success', 200, 'All categories successfully loaded', categories);
    }
    response(res, 'Not found', 200, 'Categories not found');
  } catch (err) {
    next(err);
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
