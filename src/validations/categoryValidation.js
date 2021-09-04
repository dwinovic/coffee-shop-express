import { body } from 'express-validator';
import categoriesModel from '../models/categoriesModel.js';

const addCategoryFieldRules = () => [
  body('category_name')
    .notEmpty()
    .withMessage('Please insert category name')
    .bail()
    .custom(async (value) => {
      const checkExistCategories = await categoriesModel.showCategory('category_name', value);
      if (checkExistCategories.length > 0) {
        throw new Error('This category already available');
      } else {
        return true;
      }
    }),
];

const updateCategoryFieldRules = () => [
  body('category_name')
    .notEmpty()
    .withMessage('Please insert category name')
    .bail()
    .custom(async (value) => {
      const checkExistCategories = await categoriesModel.showCategory('category_name', value);
      if (checkExistCategories.length > 0) {
        throw new Error('This category already available');
      } else {
        return true;
      }
    }),
];

export default {
  addCategoryFieldRules,
  updateCategoryFieldRules,
};
