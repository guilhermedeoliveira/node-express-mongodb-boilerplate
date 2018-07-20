const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');
const authService = require('../services/authService');

const test = (req, res) => {
  res.send({ 'server': 'isRunning' });
};

const signup = async (req, res) => {
  const { email } = req.body;

  try {
    if (await userRepository.getUserByEmail(email))
      return res.status(400).send({ error: 'User already exists' });

    const user = await userRepository.createUser(req.body);
    user.password = undefined;

    return res.send({
      user,
      token: authService.generateToken({ id: user.id })
    });
  } catch (err) {
      return res.status(400).send({ error: 'Signup failed' });
    }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = userRepository.getUserByEmailWithPassword(email);

    if (!user)
      return res.status(400).send({ error: 'User not found' });

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    return res.send({
      user,
      token: authService.generateToken({ id: user.id })
    });
  } catch (err) {
      return res.status(400).send({ error: 'Signin failed' });
    }
};

const getCurrentUser = (req, res) => res.send(req.user);

const googleOAuth = (req, res) => res.redirect('/blogs');

const logout = (req, res) => {
  req.logout();
  return res.redirect('/');
};

module.exports = {
  test,
  signup,
  signin,
  getCurrentUser,
  googleOAuth,
  logout
};
