import { body, query, param } from 'express-validator';
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
        // if (checkExistCategories[0].category_name === value) {
        // return true;
        // }
        throw new Error('This category already available');
      }
      return true;
    }),
];

const rulesRead = () => [
  query('limit')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('limit must be number')
    .bail()
    .isFloat({ min: 1 })
    .withMessage('limit must be more than 0'),
  query('page')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('page must be number')
    .bail()
    .isFloat({ min: 1 })
    .withMessage('page must be more than 0'),
  query('fieldOrder')
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage('fieldOrder is required')
    .bail()
    .isLength({ min: 1 })
    .withMessage('fieldOrder must be more than 0'),
];

const rulesUpdateAndDelete = () => [
  param('id')
    .isNumeric()
    .withMessage('id must be number')
    .bail()
    .isInt({ min: 1 })
    .withMessage('id must be more than 0'),
];

export default {
  addCategoryFieldRules,
  updateCategoryFieldRules,
  rulesRead,
  rulesUpdateAndDelete,
};
