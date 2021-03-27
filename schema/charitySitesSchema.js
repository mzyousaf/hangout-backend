// import { json } from 'express'
const mongoose = require('mongoose')

const schema = new mongoose.Schema(
	{
		tanentId: {
			type: Number,
			required: "true"
		},
		charitySiteId: {
			type: Number
		},
		charitySiteData: {
			type: Object
		}
	}
)

const CharitySiteData = mongoose.model('CharitySiteSchema', schema)
module.exports = CharitySiteData