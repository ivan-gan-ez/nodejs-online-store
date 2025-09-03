const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const login = async (email, password) => {
  // 0. check if email provided is in the system
  const user = await User.findOne({ email: email });
  // 1. if not exist, throw error
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // 2. if exists, compare passwords
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid email or password.");
  }

  // 3. generate JWT token
  let token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET, // secrer...
    { expiresIn: 60 * 60 * 8 }
  );

  // 4. if password correct., return user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
};

const signup = async (name, email, password) => {
  // 0. check if the email provided already exists
  const emailExists = await User.findOne({ email: email });

  // 1 if email exists, throw error
  if (emailExists) {
    throw new Error("Email or password already exists.");
  }

  // 2. create new user
  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  // 3. save the user
  await newUser.save();

  // 4. generate JWT token
  let token = jwt.sign(
    {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.JWT_SECRET, // secrer...
    { expiresIn: 60 * 60 * 8 }
  );

  // 5. return the user
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: token,
  };
};

module.exports = { login, signup };
