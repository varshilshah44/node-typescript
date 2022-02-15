import 'module-alias/register'
import Application from './app'
import { Logger } from '@core/logger'
import { addAdmin } from '@core/addAdmin'

Application.app.listen(Application.app.get('port'), async () => {
	Logger.info(`Listening on ${Application.app.get('port')}`)
	await addAdmin()
})
