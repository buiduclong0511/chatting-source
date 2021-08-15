const md5 = require("blueimp-md5");

const User = require("../models/User");

class UserController {

    // [POST] /api/auth
    create = async (req, res) => {
        const body = req.body;

        try {
            const newUser = new User({
                email: body.email,
                username: body.username,
                password: md5(req.body.password)
            });
            const userInfo = await newUser.save();
            const {
                password,
                ...dataRes
            } = userInfo._doc;
            res.json({
                userInfo: dataRes
            });
        } catch (err) {
            json.status(500).json({
                err
            });
        }
        res.json({
            body
        });
    }

    // [GET] /api/users/:userId
    index = async (req, res) => {
        try {
            const user = await User.find({ _id: req.params.userId }, "-password");
            res.json({
                user
            });
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }

    // [GET] /api/users/?q=xxx
    getUsers = async (req, res) => {
        try {
            const users = await User.find({ "$or": [ { _id: req.query.q }, { username: req.query.q } ] }, "-password")
            res.json({
                users
            });
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }
}

module.exports = new UserController;