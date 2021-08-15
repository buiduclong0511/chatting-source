const Message = require("../models/Message");

class MessageController {
    // [GET] /api/messages/:conversationId
    show = async (req, res) => {
        try {
            const conversationId = req.params.conversationId;
            const messages = await Message.find({ conversationId })
                .populate({
                    path: "sender",
                    selector: "-password"
                });
            res.json({
                messages
            });
        } catch (err) {
            res.status.json({
                err
            });
        }
    }

    //[POST] /api/messages
    create = async (req, res) => {
        try {
            const {
                conversationId,
                senderId,
                text
            } = req.body;
            const newMessage = new Message({
                conversationId,
                sender: senderId,
                text
            });
            const message = await newMessage.save();
            res.json({
                message
            });
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }
}

module.exports = new MessageController;