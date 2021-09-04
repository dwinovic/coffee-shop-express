import { body } from 'express-validator';
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
    .withMessage('Please input delivery name'),
];

export default {
  addDeliveriesFiedlRules,
  updateDeliveriesFieldRules,
};
