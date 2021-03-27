const mongoose = require('mongoose')
const { User, Group } = require("../schema/tenant")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { resolve } = require('path');
const { rejects } = require('assert');


exports.addUser = async (firstName, lastName, email, password) => {
	try {

		let user = await User.findOne({ email })
		if (user) {
			return ({
				error: {
					status: 400,
					message: "User Already Exist",
					error: "User Already Exist"
				}
			})
		}
		user = new User({
			firstName,
			lastName,
			email,
			password
		})
		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(password, salt)

		await user.save()

		return ({
			result: {
				status: 200,
				message: "User Created",
			}
		})

	} catch (error) {
		return ({
			error: {
				status: 400,
				message: "Error : Site Data Creation Failed",
				error: error
			}
		});
	}
};

exports.checkUser = async (email, password) => {

	try {
		let user = await User.findOne({ email })
		if (!user) {
			return ({
				error: {
					status: 400,
					message: "Cridentials Invalid",
					error: "cridentials error"
				}
			})
		}

		const match = await bcrypt.compare(password, user.password)
		if (!match) {
			return ({
				error: {
					status: 400,
					message: "Cridentials Invalid",
					error: "cridentials error"
				}
			})
		}

		const payload = {
			user: {
				id: user.id
			}
		}
		return ({
			result: {
				status: 200,
				message: "Got User Successfully",
				data: payload
			}
		});

	} catch (error) {

		return ({
			error: {
				status: 400,
				message: "Site Data Not Found",
				error: error
			}
		});

	}
}

exports.getUserById = async (userId) => {

	try {
		// Story.findOne({ title: 'Casino Royale' }).populate('authors');
		const user = await User.findById(userId).select("-password")
		if (!user) {
			return ({
				error: {
					status: 400,
					message: "User Not Found",
					error: "user error"
				}
			})
		}
		return ({
			result: {
				status: 200,
				message: "Got User Successfully",
				data: user
			}
		});

	} catch (error) {

		return ({
			error: {
				status: 400,
				message: "Site Data Not Found",
				error: error
			}
		});

	}

}
