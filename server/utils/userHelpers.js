const User = require("../models/User");

async function findUserById(id) {
  return await User.findById(id);
}

function checkCurrency(user, amount) {
  return user.currency >= amount;
}

module.exports = { findUserById, checkCurrency };