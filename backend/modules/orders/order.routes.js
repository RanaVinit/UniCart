const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const controller = require("./order.controller");

/**
 * @route   POST /api/orders
 * @desc    Place a new order
 * @access  Private (Buyer)
 */
router.post("/", auth, controller.placeOrder);

/**
 * @route   GET /api/orders/buyer
 * @desc    Get all orders placed by the current user
 * @access  Private (Buyer)
 */
router.get("/buyer", auth, controller.getBuyerOrders);

/**
 * @route   GET /api/orders/seller
 * @desc    Get all orders for the current user's products
 * @access  Private (Seller)
 */
router.get("/seller", auth, controller.getSellerOrders);

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Accept or reject an order
 * @access  Private (Seller)
 */
router.patch("/:id/status", auth, controller.updateStatus);

module.exports = router;
