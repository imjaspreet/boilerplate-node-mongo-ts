import * as authMiddleware from './../middleware/auth.middleware'
import express, { Router } from 'express'
import validate from '../middleware/validate.middleware'
import * as tourController from '../api/tours'
import * as tourValidation from '../validators/tour'

const router: Router = express.Router()
router
  .route('/find')
  .get(
    validate(tourController.list),
    authMiddleware.validateTokenOptional,
    tourController.list,
  )
router.route('/point').get(authMiddleware.validateToken, tourController.point)

router
  .route('/')
  .post(
    validate(tourValidation.createData),
    authMiddleware.validateToken,
    tourController.create,
  )
router
  .route('/:id')
  .put(
    validate(tourValidation.update),
    authMiddleware.validateToken,
    tourController.update,
  )
router
  .route('/:id')
  .get(
    validate(tourValidation.get),
    authMiddleware.validateToken,
    tourController.get,
  )
router
  .route('/:id')
  .delete(
    validate(tourValidation.deleteOne),
    authMiddleware.validateToken,
    tourController.remove,
  )

router
  .route('/')
  .get(
    validate(tourValidation.search),
    authMiddleware.validateToken,
    tourController.search,
  )

export default router
