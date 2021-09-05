import express from 'express';
import productsController from '../controllers/productsController.js';
import productsValidation from '../validations/productsValidation.js';
import { Auth, Role } from '../middlewares/Auth.js';

const router = express.Router();
router
  .get('/', productsValidation('read'), productsController.readProduct)
  .post('/', Auth, Role('admin'), productsValidation('create'), productsController.createProduct)
  .get('/:id', productsValidation('detail-product'), productsController.detailProduct)
  .post('/:id', Auth, Role('admin'), productsValidation('update'), productsController.updateProduct)
  .delete('/:id', Auth, Role('admin'), productsValidation('delete'), productsController.deleteProduct)
  .get('/category/:id', productsValidation('readProductCategory'), productsController.readProductByCategory);

export default router;
