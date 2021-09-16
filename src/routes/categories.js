const Express = require('express');
const categoriesController = require('../controllers/categoriesController');
const resultOfValidation = require('../validations/ResultOfValidation');
const categoryValidation = require('../validations/categoryValidation');

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

module.exports = router;
