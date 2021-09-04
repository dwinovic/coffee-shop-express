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

export default {
  addcategory,
};
