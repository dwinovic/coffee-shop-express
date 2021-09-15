const express = require('express');
const productsController = require('../controllers/productsController');
const productsValidation = require('../validations/productsValidation');
const { Auth, Role } = require('../middlewares/Auth');

const router = express.Router();
router
  .get('/', productsValidation('read'), productsController.readProduct)
  .post('/', Auth, Role('admin'), productsValidation('create'), productsController.createProduct)
  .get('/:id', productsValidation('detail-product'), productsController.detailProduct)
  .post('/:id', Auth, Role('admin'), productsValidation('update'), productsController.updateProduct)
  .delete('/:id', Auth, Role('admin'), productsValidation('delete'), productsController.deleteProduct)
  .get('/category/:id', productsValidation('readProductCategory'), productsController.readProductByCategory);

module.exports = router;
