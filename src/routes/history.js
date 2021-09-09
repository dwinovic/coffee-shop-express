import Express from 'express';
import historyController from '../controllers/historyController.js';
import { Auth, Role } from '../middlewares/Auth.js';

const router = Express.Router();

router
  .get('/', Auth, Role('admin', 'member'), historyController.getHistory);
//   .get('/', historyController.getHistory);

export default router;
