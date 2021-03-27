// import { json } from 'express'
const mongoose = require('mongoose')
const { boolean } = require('yargs')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	joindGroups: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'group' }
	],
	groupsOwned: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'group' }
	],
	check_1: {
		type: Boolean,
	},
	check_2: {
		type: Boolean,
	},
	check_3: {
		type: Boolean,
	},
	check_4: {
		type: Boolean,
	},
	rank: {
		type: String
	}
})

const groupSchema = new mongoose.Schema(
	{
		ownerId: {
			type: String,
			required: true
		},
		check_1: {
			type: Boolean
		},
		check_2: {
			type: Boolean
		},
		check_3: {
			type: Boolean
		},
		check_4: {
			type: Boolean
		},
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
	}
)


const User = mongoose.model('user', userSchema)
const Group = mongoose.model('group', groupSchema)
module.exports = { User, Group }