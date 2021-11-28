const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
} = require("../controllers/users-controller");

router.get("/", getAllUsers);
router.get("/:uid", getUserById);
router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;
