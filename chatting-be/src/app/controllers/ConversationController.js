const Conversation = require("../models/Conversation");

class ConversationController {
    // [POST] /api/conversations
    create = async (req, res) => {
        try {
            const { senderId, receiverId } = req.body;
            const conversations = await Conversation.find({ members: { $in: senderId } });
            const isReady = conversations.some(conversation => {
                return conversation.members.includes(senderId) && conversation.members.includes(receiverId);
            });

            if (!isReady) {
                const newConversation = new Conversation({
                    members: [senderId, receiverId]
                })
                const conversation = await newConversation.save();

                const dataRes = await Conversation.find({ _id: conversation._id })
                    .populate({
                        path: "members",
                        select: "-password"
                    });
                res.json({
                    conversation: dataRes
                });
            } else {
                res.json({
                    message: "Conversation is ready!"
                });
            }
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }

    // [GET] /api/conversations/:conversationId
    index = async (req, res) => {
        try {
            const conversationId = req.params.conversationId;
            const conversations = await Conversation.find({ _id: conversationId })
                .populate({
                    path: "members"
                });
            
            res.json({
                conversations
            });
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }

    // [GET] /api/conversations/?senderId=xxx
    getByUserId = async (req, res) => {
        try {
            const senderId = req.query.senderId;
            const conversations = await Conversation.find({ members: { $in: senderId } })
                .sort({ "createdAt": -1 })
                .populate({
                    path: "members"
                });
            res.json({
                conversations
            });
        } catch (err) {
            res.status(500).json({
                err
            });
        }
    }
}

module.exports = new ConversationController;