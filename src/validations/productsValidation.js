import {
  body, param, query, validationResult,
} from 'express-validator';
import { responseError } from '../helpers/helpers.js';

const validateResult = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    next();
  } else {
    responseError(res, 'error', 422, 'invalid input', error.array());
  }
};

const mimetypeImg = (value) => {
  if (value.mimetype !== 'image/png' && value.mimetype !== 'image/jpeg') {
    throw new Error('img_product must be jpg or png');
  }
  return true;
};

const maxSizeImg = (value) => {
  if (parseInt(value.size, 10) > 2097152) {
    throw new Error('image size exceeds 2 megabytes');
  }
  return true;
};

const isDuplicateArrayExist = (value) => {
  const duplicate = new Set(value).size !== value.length;
  if (duplicate) {
    throw new Error('duplicate color id');
  }
  return true;
};

const rulesCreateImgProduct = () => [
  body('img_product')
    .notEmpty()
    .withMessage('img_product is required')
    .bail()
    .custom(mimetypeImg)
    .bail()
    .custom(maxSizeImg),
];

const rulesUpdateImgProduct = () => [
  body('img_product').optional({ checkFalsy: true }).custom(mimetypeImg).bail()
    .custom(maxSizeImg),
];

const rulesFileUploud = (req, res, next) => {
  if (req.files) {
    if (req.files.img_product) {
      delete req.files.img_product.data;
      req.body.img_product = { ...req.files.img_product };
    }
  }
  next();
};

const rulesCreateAndUpdate = () => [
  body('product_name')
    .notEmpty()
    .withMessage('product_name is required')
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage('product_name length between 3 to 255 characters'),
  body('category_id')
    .notEmpty()
    .withMessage('category_id is required')
    .bail()
    .isNumeric()
    .withMessage('category id must be number')
    .bail()
    .isInt({ min: 1 })
    .withMessage('category id must be more than 0')
    .bail()
    .isLength({ min: 1, max: 10 })
    .withMessage('category id must be more than 0 and less than 10 digits')
    .toInt(),
  body('description')
    .notEmpty()
    .withMessage('description is required')
    .bail()
    .isLength({ min: 10 })
    .withMessage('product description must be more than 10 characters'),
  body('stock')
    .notEmpty()
    .withMessage('stock is required')
    .bail()
    .isNumeric()
    .withMessage('stock must be number')
    .bail()
    .isLength({ min: 1, max: 10 })
    .withMessage('stock must be more than 0 and less than 10 digits')
    .toInt(),
  body('delivery_id')
    .if((value) => Array.isArray(value))
    .notEmpty()
    .withMessage('delivery product is required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('delivery product must be array and more than 0')
    .bail()
    .custom(isDuplicateArrayExist),
  body('delivery_id')
    .if((value) => !Array.isArray(value))
    .notEmpty()
    .withMessage('delivery product is required')
    .bail()
    .isNumeric()
    .withMessage('delivery product must be number')
    .bail()
    .isInt({ min: 1 })
    .withMessage('delivery product must be more than 0')
    .toArray(),
  body('delivery_id.*')
    .isNumeric()
    .withMessage('delivery product must be number')
    .bail()
    .isInt({ min: 1 })
    .withMessage('delivery product must be more than 0')
    .toInt(),
  body('size_id')
    .if((value) => Array.isArray(value))
    .notEmpty()
    .withMessage('size product is required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('size product must be array and more than 0')
    .bail()
    .custom(isDuplicateArrayExist),
  body('size_id')
    .if((value) => !Array.isArray(value))
    .notEmpty()
    .withMessage('size product is required')
    .bail()
    .isNumeric()
    .withMessage('size product must be number')
    .bail()
    .isInt({ min: 1 })
    .withMessage('size product must be more than 0')
    .toArray(),
  body('size_id.*')
    .isNumeric()
    .withMessage('size product must be number')
    .bail()
    .isInt({ min: 1 })
    .withMessage('size product must be more than 0')
    .toInt(),
  body('price')
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

const rulesStartDateAndEndDate = () => [
  body('delivery_start_date').notEmpty().withMessage('delivery_start_date is required'),
  body('delivery_end_date').notEmpty().withMessage('delivery_end_date is required'),
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

const validate = (method) => {
  if (method === 'create') {
    return [
      rulesFileUploud,
      rulesCreateImgProduct(),
      rulesCreateAndUpdate(),
      rulesStartDateAndEndDate(),
      validateResult,
    ];
  }
  if (method === 'update') {
    return [rulesReadUpdateDelete(), rulesFileUploud, rulesUpdateImgProduct(), rulesCreateAndUpdate(), validateResult];
  }
  if (method === 'delete') {
    return [rulesReadUpdateDelete(), validateResult];
  }
  if (method === 'read') {
    return [rulesRead(), validateResult];
  }
  if (method === 'detail-product') {
    return [rulesReadUpdateDelete(), validateResult];
  }
  if (method === 'readProductCategory') {
    return [rulesReadUpdateDelete(), rulesRead(), validateResult];
  }
};

export default validate;
