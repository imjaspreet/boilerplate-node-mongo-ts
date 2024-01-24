import * as authMiddleware from './../middleware/auth.middleware'
import express, { Router } from 'express'
import validate from '../middleware/validate.middleware'
import * as LanguageController from '../api/languages'
import * as LanguageValidation from '../validators/language'

const router: Router = express.Router()

router
  .route('/')
  .post(
    validate(LanguageValidation.createData),
    authMiddleware.validateToken,
    LanguageController.create,
  )
router
  .route('/:id')
  .put(
    validate(LanguageValidation.update),
    authMiddleware.validateToken,
    LanguageController.update,
  )
router
  .route('/:id')
  .get(
    validate(LanguageValidation.get),
    authMiddleware.validateToken,
    LanguageController.get,
  )
router
  .route('/:id')
  .delete(
    validate(LanguageValidation.deleteOne),
    authMiddleware.validateToken,
    LanguageController.remove,
  )

router
  .route('/')
  .get(
    validate(LanguageValidation.search),
    authMiddleware.validateToken,
    LanguageController.search,
  )

export default router
