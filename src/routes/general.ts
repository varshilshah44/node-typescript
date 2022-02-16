import express from 'express'
import { login } from '@controllers/general'

const router = express.Router()

router.post('/login', login)
router.post('/register', (req, res) => {
	res.send('Register')
})

export default router
