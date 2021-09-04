import { body, query, param } from 'express-validator';
import sizezModel from '../models/sizezModel.js';

const addSizeFiedlRules = () => [
  body('size_name')
    .notEmpty()
    .withMessage('Please input size name!')
    .bail()
    .custom(async (value) => {
      const checkExistSize = await sizezModel.showSize('size_name', value);
      console.log(checkExistSize.length > 0);
      if (checkExistSize.length > 0) {
        throw new Error('This size already available');
      }
      return true;
    })
    .withMessage('This size already available'),
];

const updateSizeFieldRules = () => [
  body('size_name')
    .notEmpty()
    .withMessage('Please input size name'),
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
  addSizeFiedlRules,
  updateSizeFieldRules,
  rulesUpdateAndDelete,
  rulesRead,
};
