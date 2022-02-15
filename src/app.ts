import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from '@config/config'
import { Database, dbOptions } from '@core/database'
import { Logger } from '@core/logger'

class Application {
	app: express.Application

	constructor() {
		this.app = express()
		this.middleware()
		this.config()
		this.dbConnection()
		this.routes()
	}

	private middleware() {
		this.app.use(cors())
		this.app.use(morgan('dev'))
		this.app.use(express.json())
	}

	private config() {
		this.app.set('port', config.PORT)
	}

	private dbConnection() {
		const db = new Database(
			config.MONGO_STRING,
			config.DB_OPTIONS as dbOptions
		)
		const connection = db.connect()
		connection.once('open', () => {
			Logger.info('Database connected')
		})
		connection.on('error', (err) => {
			Logger.error(`Database Error ${err.message}`)
		})
		process.on('SIGINT', () => {
			connection.close(() => {
				Logger.info(
					'Mongoose connection disconnected for master DB through app termination'
				)
				process.exit(0)
			})
		})
	}

	private routes() {
		this.app.use('/api/v1', (req: Request, res: Response) => {
			res.status(200).send('Welcome to routes')
		})

		this.app.use('/', (req: Request, res: Response) => {
			res.status(200).send('Welcome to server')
		})
	}
}

const application = new Application()
export default application
