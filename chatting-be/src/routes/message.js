const express = require('express');

const messageController = require("../app/controllers/MessageController");

const router = express.Router();

router.get("/:conversationId", messageController.show);
router.post("/", messageController.create);

module.exports = router;