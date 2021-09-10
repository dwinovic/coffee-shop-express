import Express from 'express';
import historyController from '../controllers/historyController.js';
import ordersValidation from '../validations/ordersValidation.js';
import { Auth, Role } from '../middlewares/Auth.js';

const router = Express.Router();

router
  .get('/', Auth, Role('admin', 'member'), historyController.getHistory)
  .delete('/:id', Auth, Role('admin', 'member'), ordersValidation('delete'), historyController.deleteHistory);
//   .get('/', historyController.getHistory);

export default router;
