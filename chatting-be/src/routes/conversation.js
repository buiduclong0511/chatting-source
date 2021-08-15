const express = require('express');

const conversationController = require("../app/controllers/ConversationController");
const checkAvailConversation = require('../middleWares/checkAvailConversation');

const router = express.Router();

router.post("/", conversationController.create);
router.get("/:conversationId", conversationController.index);
router.get("/", conversationController.getByUserId);

module.exports = router;