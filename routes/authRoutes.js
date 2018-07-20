const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.test);
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/current_user', authController.getCurrentUser);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), authController.googleOAuth);
router.get('/logout', authController.logout);

module.exports = app => app.use('/auth', router);
