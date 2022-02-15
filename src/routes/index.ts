import express from 'express'
import adminRouter from '@routes/admin'
import userRouter from '@routes/user'
import generalRouter from '@routes/general'

const router = express.Router()

router.use('/', generalRouter)
router.use('/admin', adminRouter)
router.use('/user', userRouter)

export default router
