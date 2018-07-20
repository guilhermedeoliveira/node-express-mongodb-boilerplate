const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const generateToken = (params = {}) =>
  jwt.sign(params, keys.authClientSecret, {
    expiresIn: 86400
});

module.exports = {
  generateToken
};
