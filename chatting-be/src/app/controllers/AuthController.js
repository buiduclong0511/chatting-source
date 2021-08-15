const md5 = require("blueimp-md5");

const User = require("../models/User");

class AuthController {

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
                userInfo: [dataRes]
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

    // [POST] /api/login
    login = async (req, res) => {
        try {
            const userInfo = await User.find({
                email: req.body.email,
                password: md5(req.body.password)
            }, "-password");
            if (userInfo.length) {
                res.json({
                    userInfo
                });
            } else {
                res.status(401).json();
            }
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }
}

module.exports = new AuthController;