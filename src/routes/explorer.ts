import * as authMiddleware from './../middleware/auth.middleware'
import express, { Router } from 'express'
import validate from '../middleware/validate.middleware'
import * as explorerController from '../api/explorers'
import * as ExplorerValidation from '../validators/explorer'

const router: Router = express.Router()
router
  .route('/find')
  .get(
    validate(ExplorerValidation.list),
    authMiddleware.validateTokenOptional,
    explorerController.list,
  )
router
  .route('/point')
  .get(authMiddleware.validateToken, explorerController.point)

router
  .route('/')
  .post(
    validate(ExplorerValidation.createData),
    authMiddleware.validateToken,
    explorerController.create,
  )
router
  .route('/:id')
  .put(
    validate(ExplorerValidation.update),
    authMiddleware.validateToken,
    explorerController.update,
  )
router
  .route('/:id')
  .get(
    validate(ExplorerValidation.get),
    authMiddleware.validateToken,
    explorerController.get,
  )
router
  .route('/:id')
  .delete(
    validate(ExplorerValidation.deleteOne),
    authMiddleware.validateToken,
    explorerController.remove,
  )

router
  .route('/')
  .get(
    validate(ExplorerValidation.search),
    authMiddleware.validateTokenOptional,
    explorerController.search,
  )

export default router
