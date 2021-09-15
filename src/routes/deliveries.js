const Express = require('express');
const deliveriesController = require('../controllers/deliveriesController');
const deliveriesValidation = require('../validations/deliveriesValidation');
const resultOfValidation = require('../validations/ResultOfValidation');

const router = Express.Router();

router
  .post(
    '/adddeliveries',
    deliveriesValidation.addDeliveriesFiedlRules(),
    resultOfValidation,
    deliveriesController.addDeliveries,
  )
  .get('/getdeliveries', deliveriesValidation.rulesRead(), resultOfValidation, deliveriesController.getDeliveries)
  .get('/showdelivery', deliveriesController.showDeliveries)
  .post(
    '/updatedelivery/:id',
    deliveriesValidation.rulesUpdateAndDelete(),
    deliveriesValidation.updateDeliveriesFieldRules(),
    resultOfValidation,
    deliveriesController.updateDelivery,
  )
  .delete('/deletedelivery/:id', deliveriesValidation.rulesUpdateAndDelete(), resultOfValidation, deliveriesController.deleteSize);

module.exports = router;
