const mongoose = require('mongoose')
const { User, Group } = require("../schema/tenant")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.addGroup = async (checks, userId) => {
    try {

        let user = await User.findById(userId)

        const group = new Group({
            ownerId: userId,
            check_1: checks.check1,
            check_2: checks.check2,
            check_3: checks.check3,
            check_4: checks.check4
        })

        // await group.users.push(user)
        await group.save()

        await User.updateOne(
            { _id: mongoose.Types.ObjectId(userId) },
            { $push: { groupsOwned: [group] } }
        )

        return ({
            result: {
                status: 200,
                message: "Group Created",
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

exports.getAllGroupByChecks = async (checks) => {
    try {

        let groups = await Group.find({
            check_1: checks.check1,
            check_2: checks.check2,
            check_3: checks.check3,
            check_4: checks.check4
        })

        return ({
            result: {
                status: 200,
                message: "Found Groups",
                data: groups
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

exports.joinGroup = async (userId, groupId) => {
    try {

        await User.updateOne(
            { _id: mongoose.Types.ObjectId(userId) },
            { $push: { joindGroups: [mongoose.Types.ObjectId(groupId)] } }
        )

        await Group.updateOne(
            { _id: mongoose.Types.ObjectId(groupId) },
            { $push: { users: [mongoose.Types.ObjectId(userId)] } }
        )

        return ({
            result: {
                status: 200,
                message: "Group Joind"
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

exports.leaveGroup = async (userId, groupId) => {
    try {

        await User.updateOne(
            { _id: mongoose.Types.ObjectId(userId) },
            { $pull: { joindGroups: mongoose.Types.ObjectId(groupId) } }
        )

        await Group.updateOne(
            { _id: mongoose.Types.ObjectId(groupId) },
            { $pull: { users: mongoose.Types.ObjectId(userId) } }
        )

        return ({
            result: {
                status: 200,
                message: "Group Leave"
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
