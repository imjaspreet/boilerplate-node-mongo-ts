import * as authMiddleware from './../middleware/auth.middleware'
import express, { Router } from 'express'
import validate from '../middleware/validate.middleware'
import * as tourVisitController from '../api/tourVisits'
import * as tourVisitValidation from '../validators/tour'

const router: Router = express.Router()

router
  .route('/')
  .post(
    validate(tourVisitValidation.createData),
    authMiddleware.validateTokenOptional,
    tourVisitController.create,
  )
router
  .route('/:id')
  .put(
    validate(tourVisitValidation.update),
    authMiddleware.validateTokenOptional,
    tourVisitController.update,
  )
router
  .route('/:id')
  .get(
    validate(tourVisitValidation.get),
    authMiddleware.validateTokenOptional,
    tourVisitController.get,
  )
router
  .route('/:id')
  .delete(
    validate(tourVisitValidation.deleteOne),
    authMiddleware.validateTokenOptional,
    tourVisitController.remove,
  )

router
  .route('/')
  .get(
    validate(tourVisitValidation.search),
    authMiddleware.validateTokenOptional,
    tourVisitController.search,
  )

export default router
