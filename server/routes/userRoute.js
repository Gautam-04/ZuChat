const express = require("express");
const {
  registerUser,
  authUser,
} = require("../controller/UserController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;