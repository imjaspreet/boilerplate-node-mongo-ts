import express, { Router } from 'express';
import validate from '../middleware/validate.middleware';
import * as userController from '../api/users';
import * as userValidation from '../validators/user';

const router: Router = express.Router();

router.route('/').post(
      validate(userValidation.createUser),
      userController.create,
);
router.route('/:id').put(
      validate(userValidation.createUser),
      userController.update,
);
router.route('/:id').get(validate(userValidation.getUser), userController.get);
router.route('/:id').delete(
      validate(userValidation.deleteUser),
      userController.remove,
);
router.route('/').get(validate(userValidation.getUsers), userController.search);

export default router;
