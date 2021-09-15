const Express = require('express');
const sizesController = require('../controllers/sizesController');
const sizeValidation = require('../validations/sizeValidation');
const resultOfValidation = require('../validations/ResultOfValidation');

const router = Express.Router();

router
  .post('/addsizes', sizeValidation.addSizeFiedlRules(), resultOfValidation, sizesController.addSize)
  .get('/getsizes', sizeValidation.rulesRead(), resultOfValidation, sizesController.getSize)
  .get('/showsize', sizesController.showSize)
  .post(
    '/updatesize/:id',
    sizeValidation.rulesUpdateAndDelete(),
    sizeValidation.updateSizeFieldRules(),
    resultOfValidation,
    sizesController.updateSize,
  )
  .delete('/deletesize/:id', sizeValidation.rulesUpdateAndDelete(), resultOfValidation, sizesController.deleteSize);

module.exports = router;
