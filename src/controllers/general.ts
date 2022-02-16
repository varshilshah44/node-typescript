import { RequestHandler } from 'express'
import { comparePassword, checkEmailExist, registerService } from '@services/general'
import { Logger } from '@core/logger'
import { responseHandler, errorHandler } from '@core/responseHandler'
import { createJWT } from '@helpers/jwt'

export const login: RequestHandler = async (req, res) => {
	try {
		Logger.info('Inside Login Controller')
		const { email, password } = req.body as {
			email: string
			password: string
		}
		if (!(typeof email == 'string' && typeof password == 'string')) {
			return errorHandler(res, false, 'Invalid Params', {}, 404)
		}
		const checkEmailResult = await checkEmailExist(email)
		if (checkEmailResult && typeof checkEmailResult == 'object') {
			const comparePasswordResult = await comparePassword(password, checkEmailResult.password)
			if (comparePasswordResult) {
				const jwtPayload = {
					id: checkEmailResult._id,
					role: checkEmailResult.role,
				}
				const jwtToken = await createJWT(jwtPayload)
				checkEmailResult.token = jwtToken
				delete checkEmailResult.password
				return responseHandler(res, true, 'Login successfully', checkEmailResult, 200)
			} else {
				return errorHandler(res, false, 'Invalid Password', {}, 404)
			}
		} else {
			return errorHandler(res, false, 'Email does not exist', {}, 404)
		}
	} catch (err) {
		Logger.error(`Login: ${err.message}`)
		return errorHandler(res, false, 'Something went wrong', {}, 404)
	}
}

export const register: RequestHandler = async (req, res) => {
	try {
		const { email, name, password } = req.body as {
			email: string
			name: string
			password: string
		}
		if (!(typeof email == 'string' && typeof name == 'string' && typeof password == 'string')) {
			return errorHandler(res, false, 'Invalid Params', {}, 404)
		}
		const checkEmailResult = await checkEmailExist(email)
		if (checkEmailResult) {
			return errorHandler(res, false, 'Email is already exist', {}, 404)
		}
		const registerResult = await registerService({ email, name, password })
		if (registerResult && typeof registerResult == 'object') {
			delete registerResult._doc.password
			return responseHandler(res, true, 'Register successfully', registerResult, 200)
		}
		return errorHandler(res, false, 'Register failed', {}, 404)
	} catch (err) {
		Logger.error(`Login: ${err.message}`)
		return errorHandler(res, false, 'Something went wrong', {}, 404)
	}
}
