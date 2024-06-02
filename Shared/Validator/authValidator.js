const slugify = require('slugify');
const { check } = require('express-validator');
const validatorMiddleware = require('../../Middlewares/validatorMiddleware')
const User = require('../../Models/User');

exports.signupValidator = [
  check('name')
    .notEmpty()
    .withMessage('User required')
    .isLength({ min: 3 })
    .withMessage('Too short User name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),

  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),

  check('passwordConfirm')
    .notEmpty()
    .withMessage('Password confirmation required'),

  validatorMiddleware,
];

exports.loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),

  check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  validatorMiddleware,
];

exports.resetPasswordValidator = [
  check('newPassword')
    .notEmpty()
    .withMessage('newPassword required')
    .isLength({ min: 6 })
    .withMessage('newPassword must be at least 6 characters')
    .custom((newPassword, { req }) => {
      if (newPassword !== req.body.newPasswordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),

  check('newPasswordConfirm')
    .notEmpty()
    .withMessage('newPassword confirmation required'),

  validatorMiddleware,
];

exports.forgetPasswordValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),

  validatorMiddleware,
];