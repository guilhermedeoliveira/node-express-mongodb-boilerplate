const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  
  return user;
};

const createUser = async (data) => {
  const user = await User.create(data);

  return user;
}

const getUserByEmailWithPassword = async (email) => {
  const user = User.findOne({ email }).select('+password');
  
  return user;
};

module.exports = {
  getUserByEmail,
  getUserByEmailWithPassword,
  createUser
};
