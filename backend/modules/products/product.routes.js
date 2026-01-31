const express = require("express");
const router = express.Router();
const controller = require("./product.controller");
const auth = require("../../middleware/auth.middleware");
const admin = require("../../middleware/admin.middleware");
const upload = require("../../utils/upload");

router.post("/", auth, upload.single("image"), controller.addProduct);
router.get("/", controller.getAllProducts);
router.get("/admin", auth, admin, controller.getAdminProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", auth, upload.single("image"), controller.updateProduct);
router.patch("/:id/status", auth, admin, controller.updateProductStatus);
router.delete("/:id", auth, controller.deleteProduct);

module.exports = router;