import express from 'express';
import usersController from '../controllers/usersController.js';
import usersValidation from '../validations/usersValidation.js';
import { Auth, Role } from '../middlewares/Auth.js';

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

export default router;
