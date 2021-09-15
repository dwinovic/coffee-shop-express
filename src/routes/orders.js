const express = require('express');
const ordersController = require('../controllers/ordersController');
const ordersValidation = require('../validations/ordersValidation');
const { Auth, Role } = require('../middlewares/Auth');

const router = express.Router();

router.post('/', Auth, Role('admin', 'member'), ordersValidation('create'), ordersController.createOrder);

module.exports = router;
