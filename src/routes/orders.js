import express from 'express';
import ordersController from '../controllers/ordersController.js';
import ordersValidation from '../validations/ordersValidation.js';
import { Auth, Role } from '../middlewares/Auth.js';

const router = express.Router();

router.post('/', Auth, Role('admin', 'member'), ordersValidation('create'), ordersController.createOrder);

export default router;
