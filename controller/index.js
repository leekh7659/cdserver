const signup = require('./signup');
const signin = require('./signin');
const signout = require('./signout');
const users = require('./users');

const controller = {
  signup,
  signin,
  signout,
  users,
};

module.exports = controller;
