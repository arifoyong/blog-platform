const express = require("express");
const router = express.Router();
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../controllers/auth");
const { create, list, read, remove } = require("../controllers/tag");

// Validation
const { tagCreateValidator } = require("../validators/tag");
const { runValidation } = require("../validators");

router.post(
  "/tag",
  tagCreateValidator,
  runValidation,
  requireSignin,
  adminMiddleware,
  create
);

router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", remove);

module.exports = router;
