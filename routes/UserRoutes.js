const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { addUser, getUserById, checkUser, addRiskToUser } = require("../controllers/UserController")

// return res.status(response.status).json(response);
router.post("/signup/", async (req, res) => {

	const { name, username, email, password, rank } = req.body;
	const { result, error } = await addUser(name, username, email, password, rank);

	if (error) {
		// return error
		res.status(error.status).json({ message: error.message, error: error.error })
	} else if (result) {
		res.status(result.status).json({ message: result.message })

	} else {
		res.status(500);
	}
});

router.post("/signin/", async (req, res) => {

	const { email, password } = req.body;
	const { result, error } = await checkUser(email, password);

	if (error) {
		// return error
		res.status(error.status).json({ message: error.message, error: error.error })
	} else if (result) {
		jwt.sign(result.data, process.env.SECRET, {
			expiresIn: 3600
		}, (err, token) => {
			if (err) throw err
			res.status(result.status).json({ message: result.message, data: token })
		})

	} else {
		res.status(500);
	}
});

router.post("/addrisk/", async (req, res) => {

	const { userId, checks } = req.body;
	const { result, error } = await addRiskToUser(userId, checks);

	if (error) {
		// return error
		res.status(error.status).json({ message: error.message, error: error.error })
	} else if (result) {
		res.status(result.status).json({ message: result.message })

	} else {
		res.status(500);
	}
});


router.get("/", async (req, res) => {
	const userId = req.body.id;

	const { result, error } = await getUserById(userId);
	if (error) {
		// return error
		res.status(error.status).json({ message: error.message, error: error.error })
	} else if (result) {
		res.status(result.status).json({ message: result.message, data: result.data })

	} else {
		res.status(500);
	}
});


module.exports = router;