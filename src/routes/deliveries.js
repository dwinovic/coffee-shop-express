import Express from 'express';
import deliveriesController from '../controllers/deliveriesController.js';
import deliveriesValidation from '../validations/deliveriesValidation.js';
import resultOfValidation from '../validations/ResultOfValidation.js';

const router = Express.Router();

router.post('/adddeliveries', deliveriesValidation.addDeliveriesFiedlRules(), resultOfValidation, deliveriesController.addDeliveries)
  .get('/getdeliveries', deliveriesController.getDeliveries)
  .get('/showdelivery', deliveriesController.showDeliveries)
  .post('/updatedelivery/:id', deliveriesValidation.updateDeliveriesFieldRules(), resultOfValidation, deliveriesController.updateDelivery)
  .delete('/deletedelivery/:id', deliveriesController.deleteSize);
export default router;
