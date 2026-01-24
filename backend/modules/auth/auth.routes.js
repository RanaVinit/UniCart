const express = require("express");
const router = express.Router();

const controller = require("./auth.controller");

/**
 * @route  POST /api/auth/register
 * @desc   Register a new user
 * @access Public
 */
router.post("/register", controller.register);
/**
 * @route  POST /api/auth/login
 * @desc   Login user and return JWT token
 * @access Public
 */
router.post("/login", controller.login);

module.exports = router;