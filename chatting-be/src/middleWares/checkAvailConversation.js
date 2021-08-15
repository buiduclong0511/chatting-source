const Conversation = require("../app/models/Conversation");

async function checkAvailConversation(req, res) {
    try {
        const conversation = await Conversation.find({ members: { $all: [req.body.senderId, req.body.receiverId] } });
        if (conversation.length) {
            res.json({
                message: "Conversation is ready!"
            });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json(
            err
        );
    }
}

module.exports = checkAvailConversation;