import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { Logger } from '@core/logger'
import config from '@config/config'

export class Application {
	app: express.Application

	constructor() {
		this.app = express()
		this.middleware()
		this.config()
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

	private routes() {
		this.app.use('/', () => {
			Logger.info('Inside route')
		})
	}
}

const application = new Application()
export default application
