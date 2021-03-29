const express = require("express");
const router = express.Router();
const { addGroup, removeGroup, getAllGroupByChecks, getOwnedGroupsByID, joinGroup, leaveGroup, getUsersByGroup } = require("../controllers/GroupController")

// return res.status(response.status).json(response);
router.post("/", async (req, res) => {

    const { rank, groupName, userId } = req.body;
    const { result, error } = await addGroup(rank, groupName, userId);

    if (error) {
        // return error
        res.status(error.status).json({ message: error.message, error: error.error })
    } else if (result) {
        res.status(result.status).json({ message: result.message })

    } else {
        res.status(500);
    }
});

router.post("/remove", async (req, res) => {

    const { userId, groupId } = req.body;
    const { result, error } = await removeGroup(userId, groupId);

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

    // const { rank } = req.body;
    const { result, error } = await getAllGroupByChecks();

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
    const { result, error } = await getOwnedGroupsByID(userId);

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

router.get("/users/:id", async (req, res) => {

    const groupId = req.params.id;
    console.log(groupId)
    const { result, error } = await getUsersByGroup(groupId);

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