const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  signupUser,
  loginUser,
} = require("../controllers/users-controller");

router.get("/", getAllUsers);
router.get("/:uid", getUserById);
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
