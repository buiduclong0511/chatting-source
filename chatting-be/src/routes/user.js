const express = require('express');

const userController = require("../app/controllers/UserController");
const checkValidUser = require("../middleWares/checkValidUser");

const router = express.Router();

router.get("/:userId", checkValidUser, userController.index);
router.get("/", userController.getUsers);

module.exports = router;