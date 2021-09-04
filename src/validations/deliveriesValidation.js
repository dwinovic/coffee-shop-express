import { body, query, param } from 'express-validator';
import deliveriesModel from '../models/deliveriesModel.js';

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
    .withMessage('Please input delivery name')
    .custom(async (value) => {
      const checkExistDeliveries = await deliveriesModel.showDeliveries('delivery_name', value);
      if (checkExistDeliveries.length > 0) {
        // console.log(checkExistDeliveries[0].delivery_name);
        // console.log(value);
        // if (checkExistDeliveries[0].delivery_name === value) {
        //   return true;
        // }
        throw new Error('This delivery alreade avaiable');
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
  addDeliveriesFiedlRules,
  updateDeliveriesFieldRules,
  rulesRead,
  rulesUpdateAndDelete,
};
