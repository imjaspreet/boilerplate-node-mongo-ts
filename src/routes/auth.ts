import express, { Router } from 'express'
import validate from '../middleware/validate.middleware'
import * as authController from '../api/auths'
import * as userValidation from '../validators/user'

const router: Router = express.Router()

router
  .route('/signup')
  .post(validate(userValidation.createUser), authController.signup)

router
  .route('/login')
  .post(validate(userValidation.login), authController.login)

router
  .route('/verify')
  .post(validate(userValidation.verify), authController.verify)

router
  .route('/forgot')
  .post(validate(userValidation.forgot), authController.forgot)

router
  .route('/resend/otp/:id')
  .get(validate(userValidation.resendOtp), authController.resendOtp)

router
  .route('/reset/:id')
  .put(validate(userValidation.reset), authController.reset)

router
  .route('/update/password/:id')
  .put(validate(userValidation.updatePassword), authController.updatePassword)

export default router
