const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const JWT_SECRET = process.env.JWT_SECRET;

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.signup = (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: "Email is taken" });
    }

    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      // res.json({ user: success });
      res.json({ message: "Signup success. Please signin" });
    });
  });
};

exports.signin = (req, res) => {
  // check if user exists
  const { email, password } = req.body;
  User.findOne({ email: email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found. Please signup" });
    }

    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({ error: "Email & password doesn't match" });
    }

    // generate token & send to client
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;

    return res.json({ token, user: { _id, username, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: JWT_SECRET,
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }

    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.role !== 1) {
      return res.status(400).json({ error: "Admin resource. Access denied" });
    }

    req.profile = user;
    next();
  });
};
