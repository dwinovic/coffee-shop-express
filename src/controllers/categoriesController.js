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

export default {
  addcategory,
  getCategories,
};
