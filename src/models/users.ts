import { Schema, model } from 'mongoose'

export interface User {
	email: string
	name: string
	password: string
	role: 'Admin' | 'Client'
	_id?: string
	token?: string
	_doc?: any
}

const schema = new Schema<User>(
	{
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: 'Client',
		},
		token: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: 'users',
	}
)

export const userModel = model<User>('user', schema)
