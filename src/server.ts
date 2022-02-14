import 'module-alias/register'
import Application from './app'
import { Logger } from '@core/logger'

Application.app.listen(Application.app.get('port'), () => {
	Logger.info(`Listening on ${Application.app.get('port')}`)
})
