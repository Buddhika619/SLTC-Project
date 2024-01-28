import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUsers,
  updateUser,
  getSingleUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get( getUsers)

router.post('/login/:role', authUser)

router.route('/:id').put( updateUser).get( getSingleUser)

export default router

