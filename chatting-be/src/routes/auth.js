const express = require('express');

const authController = require("../app/controllers/AuthController");
const checkValidUser = require("../middleWares/checkValidUser");

const router = express.Router();

router.post("/register", checkValidUser, authController.create);
router.post("/login", authController.login);

module.exports = router;