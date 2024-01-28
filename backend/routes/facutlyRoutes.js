import express from 'express'
const router = express.Router()
import { createFaculty } from '../controllers/facultyController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').post( createFaculty)


export default router
