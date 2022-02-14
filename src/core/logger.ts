import { transports, createLogger, format } from 'winston'
import 'winston-daily-rotate-file'

export const Logger = createLogger({
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.json()
	),
	transports: [
		new transports.Console(),
		new transports.DailyRotateFile({
			filename: './logs/error-%DATE%.log',
			maxSize: '10m',
			datePattern: 'YYYY-MM-DD',
			level: 'error',
		}),
		new transports.DailyRotateFile({
			filename: './logs/activity-%DATE%.log',
			maxSize: '10m',
			datePattern: 'YYYY-MM-DD',
			level: 'info',
		}),
	],
})
