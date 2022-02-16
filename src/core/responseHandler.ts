import { Response } from 'express'

export const responseHandler = (res: Response, status: true, message: string, data = {}, statusCode: number) => {
	res.json({
		status,
		message,
		data,
		statusCode,
	})
}

export const errorHandler = (res: Response, status: false, message: string, data = {}, statusCode: number) => {
	res.json({
		status,
		message,
		data,
		statusCode,
	})
}
