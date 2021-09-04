import Express from 'express';
import categoriesController from '../controllers/categoriesController.js';
import resultOfValidation from '../validations/ResultOfValidation.js';
import categoryValidation from '../validations/categoryValidation.js';

const router = Express.Router();

router
  .post(
    '/addcategory',
    categoryValidation.addCategoryFieldRules(),
    resultOfValidation,
    categoriesController.addcategory,
  )
  .get('/getcategory', categoryValidation.rulesRead(), resultOfValidation, categoriesController.getCategories)
  .get('/showcategory', categoriesController.showCategory)
  .post(
    '/updatecategory/:id',
    categoryValidation.rulesUpdateAndDelete(),
    categoryValidation.updateCategoryFieldRules(),
    resultOfValidation,
    categoriesController.updatecategory,
  )
  .delete('/deletecategory/:id', categoryValidation.rulesUpdateAndDelete(), resultOfValidation, categoriesController.deleteCategory);
export default router;
