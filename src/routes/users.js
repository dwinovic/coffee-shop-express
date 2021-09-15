const express = require('express');
const usersController = require('../controllers/usersController');
const usersValidation = require('../validations/usersValidation');
const { Auth, Role } = require('../middlewares/Auth');

const router = express.Router();

router
  .get('/', Auth, Role('admin'), usersValidation('read'), usersController.readUser)
  .post('/auth/register', usersValidation('register'), usersController.register)
  .post('/auth/login', usersValidation('login'), usersController.login)
  .get('/profile', Auth, Role('member', 'admin'), usersController.profile)
  .patch('/check-token', usersController.checkToken)
  .post('/verify-email', usersController.verifEmail)
  .patch('/forgot-password', usersValidation('forgot-password'), usersController.forgotPassword)
  .patch('/reset-password', usersValidation('reset-password'), usersController.resetPassword)
  .post('/refresh-token', usersController.refreshToken)
  .patch(
    '/update-password',
    Auth,
    Role('admin', 'member'),
    usersValidation('update-password'),
    usersController.updatePassword,
  )
  .delete('/logout', Auth, Role('member', 'admin'), usersController.logout)
  .get('/:id', Auth, Role('member', 'admin'), usersValidation('profile-id'), usersController.getStatus)
  .post('/:id', Auth, Role('member', 'admin'), usersValidation('update'), usersController.updateUser);

module.exports = router;
