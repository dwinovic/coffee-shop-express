/* eslint-disable object-curly-newline */
const { body, param, query, validationResult } = require('express-validator');
const { responseError } = require('../helpers/helpers');
const usersModel = require('../models/usersModel');

const validateResult = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    next();
  } else {
    responseError(res, 'error', 422, 'invalid input', error.array());
  }
};

const rulesRegister = () => [
  body('phone_number')
    .isNumeric()
    .withMessage('phone number must be number')
    .bail()
    .isLength({ min: 11, max: 13 })
    .withMessage('phone number must be more than 10 and less than 15 digits'),
];

const rulesLogin = () => [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('The email you entered is not correct')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .bail()
    .isLength({ min: 8, max: 255 })
    .withMessage('password length between 8 to 255'),
];

const refreshToken = () => [
  body('refreshToken').notEmpty().withMessage('refreshToken is required'),
];

const rulesUpdateUser = () => [
  body('firstname')
    .notEmpty()
    .withMessage('firstname is required')
    .bail()
    .isLength({ min: 3, max: 225 })
    .withMessage('firstname length between 4 to 255'),
  body('lastname')
    .notEmpty()
    .withMessage('lastname is required')
    .bail()
    .isLength({ min: 3, max: 225 })
    .withMessage('lastname length between 4 to 255'),
  body('phone_number')
    .isNumeric()
    .withMessage('phone number must be number')
    .bail()
    .isLength({ min: 10, max: 15 })
    .withMessage('phone number must be more than 10 and less than 15 digits'),
  body('gender')
    .notEmpty()
    .withMessage('gender is required')
    .bail()
    .isIn(['female', 'male'])
    .withMessage('the value of the gender must be female or male'),
  body('date_of_birth')
    .notEmpty()
    .withMessage('date of birth is required')
    .bail()
    .isDate()
    .withMessage('date of birth must be date'),
  body('address')
    .notEmpty()
    .withMessage('address is required')
    .bail()
    .isLength({ min: 10 })
    .withMessage('address must be more than 10 characters'),
  body('roles')
    .optional({ checkFalsy: true })
    .isIn(['admin', 'user'])
    .withMessage('the value of the roles must be admin or user'),
];

const rulesCreatePassword = () => [
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .bail()
    .isLength({ min: 8, max: 255 })
    .withMessage('password length between 8 to 255'),
];

const rulesCreateEmail = () => [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('The email you entered is not correct')
    .bail()
    .custom(async (value) => {
      const existingEmail = await usersModel.checkExistUser(value, 'email');
      if (existingEmail.length > 0) {
        throw new Error('e-mail already registered');
      }
      return true;
    }),
];

const rulesUpdateEmail = () => [
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('The email you entered is not correct')
    .bail()
    .custom(async (value) => {
      const existingEmail = await usersModel.checkExistUser(value, 'email');
      if (existingEmail.length > 0) {
        throw new Error('e-mail already registered');
      }
      return true;
    })
    .normalizeEmail(),
];

const rulesFileUploud = (req, res, next) => {
  if (req.files) {
    if (req.files.avatar) {
      delete req.files.avatar.data;
      req.body.avatar = { ...req.files.avatar };
    }
  }
  next();
};

const rulesUpdateImgUser = () => [
  body('avatar')
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (value.mimetype !== 'image/png' && value.mimetype !== 'image/jpeg') {
        throw new Error('avatar mmust be jpg or png');
      }
      return true;
    })
    .bail()
    .custom((value) => {
      if (parseInt(value.size, 10) > 2097152) {
        throw new Error('image size exceeds 2 megabytes');
      }
      return true;
    }),
];

const rulesReadUpdateDelete = () => [
  param('id')
    .isNumeric()
    .withMessage('id must be number')
    .bail()
    .isInt({ min: 1 })
    .withMessage('id must be more than 0'),
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

const changePassword = () => [
  body('new_password')
    .notEmpty()
    .withMessage('new_password is required')
    .bail()
    .isLength({ min: 8, max: 255 })
    .withMessage('new_password length between 8 to 255'),
  body('old_password')
    .notEmpty()
    .withMessage('old_password is required')
    .bail()
    .isLength({ min: 8, max: 255 })
    .withMessage('old_password length between 8 to 255'),
];

const validate = (method) => {
  if (method === 'register') {
    return [
      rulesRegister(),
      rulesCreatePassword(),
      rulesCreateEmail(),
      validateResult,
    ];
  }
  if (method === 'login') {
    return [rulesLogin(), validateResult];
  }
  if (method === 'refreshToken') {
    return [refreshToken(), validateResult];
  }
  if (method === 'update') {
    return [
      rulesFileUploud,
      rulesReadUpdateDelete(),
      rulesUpdateImgUser(),
      rulesUpdateUser(),
      rulesUpdateEmail(),
      validateResult,
    ];
  }
  if (method === 'read') {
    return [rulesRead(), validateResult];
  }
  if (method === 'profile-id') {
    return [rulesReadUpdateDelete(), validateResult];
  }
  if (method === 'forgot-password') {
    return [
      body('email')
        .notEmpty()
        .withMessage('email is required')
        .bail()
        .isEmail()
        .withMessage('The email you entered is not correct'),
      validateResult,
    ];
  }
  if (method === 'reset-password') {
    return [rulesCreatePassword(), validateResult];
  }
  if (method === 'update-password') {
    return [changePassword(), validateResult];
  }
};

module.exports = validate;
