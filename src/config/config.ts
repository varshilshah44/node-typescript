import dotenv from 'dotenv'
dotenv.config()
export default {
	PORT: (process.env.PORT as string) ? (process.env.PORT as string) : '3000',
	MONGO_STRING: process.env.MONGO_STRING as string,
	DB_OPTIONS: {
		useNewUrlParser: true,
	},
}
