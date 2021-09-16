const { body, query, param } = require('express-validator');
const deliveriesModel = require('../models/deliveriesModel');

const addDeliveriesFiedlRules = () => [
  body('delivery_name')
    .notEmpty()
    .withMessage('Please input delivery name!')
    .bail()
    .custom(async (value) => {
      const checkExistDeliveries = await deliveriesModel.showDeliveries('delivery_name', value);
      if (checkExistDeliveries.length > 0) {
        throw new Error('This size already available');
      }
      return true;
    })
    .withMessage('This size already available'),
];

const updateDeliveriesFieldRules = () => [
  body('delivery_name')
    .notEmpty()
    .withMessage('Please input delivery name'),
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

module.exports = {
  addDeliveriesFiedlRules,
  updateDeliveriesFieldRules,
  rulesRead,
  rulesUpdateAndDelete,
};
