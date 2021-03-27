const express = require("express");
const dotenv = require("dotenv")

dotenv.config()
const app = express();
const PORT = process.env.VB_PORT || 3090;
const userRoute = require("./routes/UserRoutes")
const bodyParser = require("body-parser");

const { connectDB } = require("./db/DatabaseConfig");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/user", userRoute);

//database connection
connectDB();

//service startup
app.listen(PORT, () => {
	console.log(`Server Started on Port ${PORT}`);
});
