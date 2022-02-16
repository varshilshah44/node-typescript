import { userModel, User } from '@models/users'
import bcrypt from 'bcrypt'

export const checkEmailExist = async (email: string): Promise<boolean | User> => {
	const result = await userModel.findOne({ email }).lean()
	return result ? result : false
}

export const comparePassword = async (plainPassword: string, encryptedPassowrd: string): Promise<boolean> => {
	const result = await bcrypt.compare(plainPassword, encryptedPassowrd)
	return result ? result : false
}
