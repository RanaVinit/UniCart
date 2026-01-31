const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./user.controller");

/**
 * @route  GET /api/users/me
 * @desc   Get current logged-in user profile
 * @access Private
 */
router.get("/me", auth, controller.me);

module.exports = router;