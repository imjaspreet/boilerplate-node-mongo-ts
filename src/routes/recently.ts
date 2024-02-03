import * as authMiddleware from './../middleware/auth.middleware'
import express, { Router } from 'express'
import validate from '../middleware/validate.middleware'
import * as RecentlyController from '../api/recently'
import * as RecentlyValidation from '../validators/recently'

const router: Router = express.Router()
router
  .route('/mark/favorite')
  .post(
    validate(RecentlyValidation.createData),
    authMiddleware.validateTokenOptional,
    RecentlyController.markFavorite,
  )
router
  .route('/')
  .post(
    validate(RecentlyValidation.createData),
    authMiddleware.validateTokenOptional,
    RecentlyController.create,
  )
router
  .route('/:id')
  .put(
    validate(RecentlyValidation.update),
    authMiddleware.validateToken,
    RecentlyController.update,
  )
router
  .route('/:id')
  .get(
    validate(RecentlyValidation.get),
    authMiddleware.validateTokenOptional,
    RecentlyController.get,
  )
router
  .route('/:id')
  .delete(
    validate(RecentlyValidation.deleteOne),
    authMiddleware.validateToken,
    RecentlyController.remove,
  )

router
  .route('/')
  .get(
    validate(RecentlyValidation.search),
    authMiddleware.validateTokenOptional,
    RecentlyController.search,
  )

export default router
