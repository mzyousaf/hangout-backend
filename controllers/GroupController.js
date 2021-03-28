const mongoose = require('mongoose')
const { User, Group } = require("../schema/tenant")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.addGroup = async (rank, name, userId) => {
    try {

        let user = await User.findById(userId)

        const group = new Group({
            groupName: name,
            ownerId: userId,
            ownerEmail: user.email,
            groupRank: rank
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
                message: "Error",
                error: error
            }
        });
    }
};

exports.removeGroup = async (userId, groupId) => {
    try {

        const isOwner = await Group.findOne(
            { _id: mongoose.Types.ObjectId(groupId), ownerId: mongoose.Types.ObjectId(userId) }
        )

        if (!isOwner) {
            return ({
                result: {
                    status: 200,
                    message: "Group Not Found",
                }
            })
        }
        await User.updateOne(
            { _id: mongoose.Types.ObjectId(userId) },
            { $pull: { groupsOwned: mongoose.Types.ObjectId(groupId) } }
        )

        await Group.findByIdAndRemove(groupId)

        return ({
            result: {
                status: 200,
                message: "Group Delted",
            }
        })

    } catch (error) {
        return ({
            error: {
                status: 400,
                message: "Error",
                error: error
            }
        });
    }
};

exports.getAllGroupByChecks = async (rank) => {
    try {

        let groups = await Group.find({
            groupRank: rank
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
                message: "Error",
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
                message: "Error",
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
                message: "Error",
                error: error
            }
        });
    }
};

exports.getOwnedGroupsByID = async (userId) => {
    try {
        console.log(userId)
        // console.log(await User.findById(userId))
        const data = await User.findById(userId).populate("groupsOwned");

        return ({
            result: {
                status: 200,
                message: "Groups Owned",
                data: data
            }
        })

    } catch (error) {
        return ({
            error: {
                status: 400,
                message: "Error",
                error: error
            }
        });
    }
};

exports.getUsersByGroup = async (groupId) => {
    try {
        // console.log(userId)
        // console.log(await User.findById(userId))
        const data = await User.find({ joindGroups: { "$in": [groupId] } })

        return ({
            result: {
                status: 200,
                message: "Groups Owned",
                data: data
            }
        })

    } catch (error) {
        return ({
            error: {
                status: 400,
                message: "Error",
                error: error
            }
        });
    }
};

