const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

let DUMMY_USERS = [
  { id: "u1", username: "hidayat", password: "password1" },
  { id: "u2", username: "dummy", email: "password2" },
];

const getAllUsers = (req, res, next) => {
  if (DUMMY_USERS.length < 1) {
    return res.status(404).json({ message: "Could not found any user." });
  }
  res.status(200).json({ users: DUMMY_USERS });
};

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((user) => user.id === userId);
  if (!user) {
    return res
      .status(404)
      .json({ message: "Could not find a user with that ID." });
  }
  res.status(200).json({ user });
};

const signupUser = (req, res, next) => {
  const { username, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorInputs = errors.errors.map((input) => input.param);
    throw new HttpError(`Invalid input of ${errorInputs}`, 422);
  }
  if (username && password) {
    const existingUser = DUMMY_USERS.find((user) => user.username === username);
    if (existingUser) {
      throw new HttpError("User already exists", 422);
    }
    DUMMY_USERS.push({
      username,
      password,
      id: uuid(),
    });
    const newUser = DUMMY_USERS.find((user) => user.username === username);
    return res.status(201).json({ user: newUser });
  }
  res.status(400).json({ message: "Please fill all the requirements." });
};

const loginUser = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    const identifiedUser = DUMMY_USERS.find(
      (user) => user.username === username && user.password === password
    );
    if (!identifiedUser || identifiedUser.password !== password) {
      throw new HttpError("Credentials are wrong.", 401);
    }
    return res.status(200).json({ user: identifiedUser });
  } else {
    throw new HttpError("Please fill all requirements.", 400);
  }
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.signupUser = signupUser;
exports.loginUser = loginUser;
