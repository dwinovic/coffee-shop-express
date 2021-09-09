import { body, param, validationResult } from 'express-validator';
import { responseError } from '../helpers/helpers.js';

const validateResult = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    next();
  } else {
    responseError(res, 'error', 422, 'invalid input', error.array());
  }
};

const rulesCreateOrder = () => [
  body('phone_number')
    .isNumeric()
    .withMessage('phone number must be number')
    .bail()
    .isLength({ min: 11, max: 13 })
    .withMessage('phone number must be more than 10 and less than 15 digits'),
  body('address')
    .notEmpty()
    .withMessage('address is required')
    .bail()
    .isLength({ min: 10 })
    .withMessage('address must be more than 10 characters'),
  body('payment')
    .notEmpty()
    .withMessage('payment is required')
    .bail()
    .isIn(['delivery', 'bank', 'credit_card'])
    .withMessage('the value of the gender must be female or male'),
  body('carts').notEmpty().withMessage('carts is required'),
  body('total_price')
    .notEmpty()
    .withMessage('price is required')
    .bail()
    .isNumeric()
    .withMessage('price must be number')
    .bail()
    .isLength({ min: 1 })
    .withMessage('price must be more than 0 digits')
    .isInt({ min: 1 })
    .withMessage('price must be more than 0')
    .toInt(),
];

const rulesReadUpdateDelete = () => [
  param('id')
    .isNumeric()
    .withMessage('id must be number')
    .bail()
    .isInt({ min: 1 })
    .withMessage('id must be more than 0'),
];

const validate = (method) => {
  if (method === 'create') {
    return [rulesCreateOrder(), validateResult];
  }
  if (method === 'delete') {
    return [rulesReadUpdateDelete(), validateResult];
  }
};

export default validate;
