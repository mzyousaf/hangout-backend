const mongoose = require("mongoose");
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER_DB = process.env.MONGO_USER_DB;
const connectDB = async () => {
	console.log(process.env.MONGO_USERNAME)
	try {
		mongoose.Promise = global.Promise;
		mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_USER_DB}?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			});
		const db = mongoose.connection;
		db.on("error", error =>
			console.log(error)
		);
		db.once("open", () =>
			console.log("connected to db")
		);
	} catch (err) {
		console.log(err);
		//process.exit(1)        
	}
};

const disconnectDB = async () => {
	try {
		mongoose.disconnect()
	} catch (error) {
		console.log(error)
	}
}

module.exports = { connectDB, disconnectDB };