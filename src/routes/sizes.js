import Express from 'express';
import sizesController from '../controllers/sizesController.js';
import sizeValidation from '../validations/sizeValidation.js';
import resultOfValidation from '../validations/ResultOfValidation.js';

const router = Express.Router();

router.post('/addsizes', sizeValidation.addSizeFiedlRules(), resultOfValidation, sizesController.addSize)
  .get('/getsizes', sizesController.getSize)
  .get('/showsize', sizesController.showSize)
  .post('/updatesize/:id', sizeValidation.updateSizeFieldRules(), resultOfValidation, sizesController.updateSize)
  .delete('/deletesize/:id', sizesController.deleteSize);
export default router;
