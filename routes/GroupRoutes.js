const express = require("express");
const router = express.Router();
const { addGroup, getAllGroupByChecks, getGroupsByID, joinGroup, leaveGroup } = require("../controllers/GroupController")

// return res.status(response.status).json(response);
router.post("/", async (req, res) => {

    const { rank, checks, userId } = req.body;
    const { result, error } = await addGroup(rank, checks, userId);

    if (error) {
        // return error
        res.status(error.status).json({ message: error.message, error: error.error })
    } else if (result) {
        res.status(result.status).json({ message: result.message })

    } else {
        res.status(500);
    }
});

router.post("/getGroups", async (req, res) => {

    const { rank } = req.body;
    const { result, error } = await getAllGroupByChecks(rank);

    if (error) {
        // return error
        res.status(error.status).json({ message: error.message, error: error.error })
    } else if (result) {
        res.status(result.status).json({ message: result.message, data: result.data })

    } else {
        res.status(500);
    }
});

router.get("/:id", async (req, res) => {

    const userId = req.params.id;
    const { result, error } = await getGroupsByID(userId);

    if (error) {
        // return error
        res.status(error.status).json({ message: error.message, error: error.error })
    } else if (result) {
        res.status(result.status).json({ message: result.message, data: result.data })

    } else {
        res.status(500);
    }
});

router.post("/join/", async (req, res) => {

    const { userId, groupId } = req.body;
    const { result, error } = await joinGroup(userId, groupId);

    if (error) {
        // return error
        res.status(error.status).json({ message: error.message, error: error.error })
    } else if (result) {
        res.status(result.status).json({ message: result.message })

    } else {
        res.status(500);
    }
});

router.post("/leave/", async (req, res) => {

    const { userId, groupId } = req.body;
    const { result, error } = await leaveGroup(userId, groupId);

    if (error) {
        // return error
        res.status(error.status).json({ message: error.message, error: error.error })
    } else if (result) {
        res.status(result.status).json({ message: result.message })

    } else {
        res.status(500);
    }
});



module.exports = router;