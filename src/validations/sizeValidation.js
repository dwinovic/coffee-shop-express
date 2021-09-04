import { body } from 'express-validator';
// import sizezModel from '../models/sizezModel.js';

const addSizeFiedlRules = () => [
  body('size_name')
    .notEmpty()
    .withMessage('Please input size name!'),
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

const updateSizeFieldRules = () => [
  body('size_name')
    .notEmpty()
    .withMessage('Please input size name'),
];

export default {
  addSizeFiedlRules,
  updateSizeFieldRules,
};
