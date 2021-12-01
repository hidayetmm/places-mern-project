const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  getAllUsers,
  getUserById,
  signupUser,
  loginUser,
} = require("../controllers/users-controller");

const userInputs = { username: "username", password: "password" };
const { username, password } = userInputs;

const signupUserValidations = [
  check(username).isLength({ min: 4, max: 12 }),
  check(password).isLength({ min: 8 }),
];

router.get("/", getAllUsers);
router.get("/:uid", getUserById);
router.post("/signup", signupUserValidations, signupUser);
router.post("/login", loginUser);

module.exports = router;
