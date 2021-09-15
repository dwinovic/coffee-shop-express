const Express = require('express');
const historyController = require('../controllers/historyController');
const ordersValidation = require('../validations/ordersValidation');
const { Auth, Role } = require('../middlewares/Auth');

const router = Express.Router();

router
  .get('/', Auth, Role('admin', 'member'), historyController.getHistory)
  .delete('/:id', Auth, Role('admin', 'member'), ordersValidation('delete'), historyController.deleteHistory);
//   .get('/', historyController.getHistory);

module.exports = router;
