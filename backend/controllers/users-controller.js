const { v4: uuid } = require("uuid");

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

const createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    const existingUser = DUMMY_USERS.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
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
    const loggedUser = DUMMY_USERS.find(
      (user) => user.username === username && user.password === password
    );
    if (loggedUser) {
      return res.status(400).json({ user: loggedUser });
    }
    res.status(404).json({ message: "No user found." });
  } else {
    res.status(400).json({ message: "Please fill all requirements." });
  }
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.loginUser = loginUser;
