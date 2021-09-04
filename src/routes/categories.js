import Express from 'express';
import categoriesController from '../controllers/categoriesController.js';
import resultOfValidation from '../validations/ResultOfValidation.js';
import categoryValidation from '../validations/categoryValidation.js';

const router = Express.Router();

router.post(
  '/addcategory',
  categoryValidation.addCategoryFieldRules(),
  resultOfValidation,
  categoriesController.addcategory,
);
export default router;
