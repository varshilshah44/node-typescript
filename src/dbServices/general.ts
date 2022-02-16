import bcrypt from 'bcrypt'
import { userModel, User } from '@models/users'
import config from '@config/config'

export const checkEmailExist = async (email: string): Promise<boolean | User> => {
	const result = await userModel.findOne({ email }).lean()
	return result ? result : false
}

export const comparePassword = async (plainPassword: string, encryptedPassowrd: string): Promise<boolean> => {
	const result = await bcrypt.compare(plainPassword, encryptedPassowrd)
	return result ? result : false
}

export const registerService = async (data: { name: string; email: string; password: string }): Promise<boolean | User> => {
	const { name, email, password } = data
	const encryptedPassowrd = await bcrypt.hash(password, 12)
	const result = await userModel.create({
		name,
		email,
		password: encryptedPassowrd,
		role: 'Client',
	})
	return result ? result : false
}
