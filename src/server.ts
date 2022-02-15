import 'module-alias/register'
import Application from './app'
import { Logger } from '@core/logger'
import { addAdmin } from '@core/addAdmin'

Application.app.listen(Application.app.get('port'), () => {
	Logger.info(`Listening on ${Application.app.get('port')}`)
	addAdmin().then((res) => {
		if (res) {
			Logger.info('Admin added successfully')
		} else {
			Logger.info('Admin already added')
		}
	})
})
