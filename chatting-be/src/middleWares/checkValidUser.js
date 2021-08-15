const User = require("../app/models/User");

async function checkValidUser(req, res, next) {
    try {
        const email = req.body.email;
        const listUser = await User.find({ email });
        
        if (listUser.length) {
            res.status(409).json();
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({
            err
        });
        return;
    }
}

module.exports = checkValidUser;