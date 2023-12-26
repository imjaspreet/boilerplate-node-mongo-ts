import express, { Router } from 'express';
import validate from '../middleware/validate.middleware';
import * as userController from '../api/users';
import * as userValidation from '../validators/user';


const router: Router = express.Router();

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser)

export default router;
