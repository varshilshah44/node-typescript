import mongoose from 'mongoose'

export interface dbOptions {
	[key: string]: string | number | boolean
}

export class Database {
	private dbString: string
	private dbOptions: dbOptions

	constructor(dbString: string, dbOptions: dbOptions) {
		this.dbString = dbString
		this.dbOptions = dbOptions
	}

	connect() {
		mongoose.connect(this.dbString, this.dbOptions)
		return mongoose.connection
	}
}
