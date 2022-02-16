import jwt from 'jsonwebtoken'
import config from '@config/config'

export const createJWT = (payload: { id: string; role: 'Admin' | 'Client' }) => {
	const token = jwt.sign(payload, config.JWT_KEY)
	return token
}
