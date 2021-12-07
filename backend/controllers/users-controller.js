const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../models/user");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "hidayat",
    email: "email@vrvrv.com",
    password: "password1",
  },
  {
    id: "u2",
    name: "dummy",
    email: "email@qxsxqs.com",
    password: "1224veve43",
  },
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

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorInputs = errors.errors.map((input) => input.param);
    return next(new HttpError(`Invalid input of ${errorInputs}`, 422));
  }
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Signup failed, please try again later.", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User already exists, please login instead.",
      422
    );
    return next(error);
  }
  const createdUser = User({
    name,
    email,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    password,
    places,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  return res
    .status(201)
    .json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
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
