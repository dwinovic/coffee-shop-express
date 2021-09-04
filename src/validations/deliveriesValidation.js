import { body } from 'express-validator';
// import sizezModel from '../models/sizezModel.js';

const addDeliveriesFiedlRules = () => [
  body('delivery_name')
    .notEmpty()
    .withMessage('Please input delivery name!'),
  // .bail()
  // .custom(async (value) => {
  //   const checkExistSize = await sizezModel.showSize('size_name', value);
  //   console.log(checkExistSize.length > 0);
  //   if (checkExistSize.length > 0) {
  //     return false;
  //   }
  //   return true;
  // })
  // .withMessage('This size already available'),
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
