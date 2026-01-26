const express = require("express");
const router = express.Router();
const controller = require("./product.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/", auth, controller.addProduct);
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", auth, controller.updateProduct);
router.delete("/:id", auth, controller.deleteProduct);

module.exports = router;