const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const authService = require('../services/authService');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ error: 'No token provided' });
  
  const parts = authorization.split(' ');
  
  if (parts.length !== 2)
    return res.status(401).send({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, keys.authClientSecret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });

    req.userId = decoded.id;
    return next();
  });
};
