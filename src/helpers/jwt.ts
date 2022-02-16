import jwt from 'jsonwebtoken'
import { userModel } from '@models/users'
import config from '@config/config'

export const createJWT = async (payload: { id: string; role: 'Admin' | 'Client' }): Promise<string> => {
	const token = jwt.sign(payload, config.JWT_KEY)
	await userModel.findByIdAndUpdate(payload.id, {
		token,
	})
	return token
}
