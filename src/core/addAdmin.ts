import bcrypt from 'bcrypt'
import { userModel, User } from '@models/users'
import { Logger } from '@core/logger'
import config from '@config/config'

export const addAdmin = async (): Promise<boolean> => {
	try {
		const getUsers = await userModel.findOne({ role: 'Admin' }).lean()
		if (!getUsers) {
			const encryptPassword: string = await bcrypt.hash(
				config.ADMIN_PASSWORD,
				12
			)
			await userModel.create<User>({
				email: 'varshil.shah@solulab.co',
				name: 'Varshil',
				password: encryptPassword,
				role: 'Admin',
			})
			Logger.info('Admin added successfully')
			return true
		}
		Logger.info('Admin already added')
		return false
	} catch (err) {
		Logger.error(`Error: ${err.message}`)
		return false
	}
}
