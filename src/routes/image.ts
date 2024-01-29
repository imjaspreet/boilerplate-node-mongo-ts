import express, { Router } from 'express'
import * as imageController from '../api/images'

const router: Router = express.Router()
router.route('/').post(imageController.imageUpload)
// router.route('/bulk').post(imageController.bulkUpload)
export default router
