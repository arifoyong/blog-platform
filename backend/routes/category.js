const express = require("express");
const router = express.Router();

// Controllers
const { create, list, read, remove } = require("../controllers/category");
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");

// Validation
const { runValidation } = require("../validators");
const { categoryCreateValidator } = require("../validators/category");

// Router
router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);
router.get("/categories", list);
router.get("/category/:slug", read);
router.delete("/category/:slug", requireSignin, adminMiddleware, remove);

module.exports = router;
