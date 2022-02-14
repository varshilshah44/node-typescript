import 'dotenv'
export default {
	PORT: (process.env.PORT as string) ? (process.env.PORT as string) : '3000',
}
