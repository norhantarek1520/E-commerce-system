const User = require('../Models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
const { sendEmail, createToken, createHashPassword } = require('../Shared/SharedFunctions');

class AuthController {

  static register = asyncHandler(async (req, res, next) => {
    const hash = await createHashPassword(req.body.password);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash // Replace plaintext password with the hash
    });

    // 2- Generate token
    if (process.env.JWT_KEY != null && process.env.JWT_EXPIRE_TIME != null) {
      //const token =  jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_TIME,});
      const token = createToken(user._id)
      if (token != null) {
        delete user._doc.password;
        res.status(200).json({ token });
      }
      else {
        res.status(500).json("Yourdata is added to databases but we have poblem , please try to login ")
      }
    }
    else {
      return next(new ApiError('JWT configuration missing. Please set JWT_KEY and JWT_EXPIRE_TIME environment variables.', 500));
    }


  });
  static login = asyncHandler(async (req, res, next) => {
    // 1) check if password and email in the body (validation)
    // 2) check if user exist & check if password is correct
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ApiError('Unfounded email', 401));
    }
    else if (!await bcrypt.compare(req.body.password, user.password)) {
      return next(new ApiError('Incorrect password', 404));
    }
    else {
      const token = createToken(user._id)
      if (token != null) {
        delete user._doc.password;
        res.status(200).json({ token });
      }
      else {
        res.status(500).json("Sorry we have poblem in login , please try again ")
      }


    }


  })
  static logout = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      jwt.verify(token, process.env.JWT_KEY);
      // Add the token to the blacklist
      // blacklist.add(token);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      // Handle invalid token errors gracefully
      res.status(401).json({ message: 'Invalid token' });
    }
  })

  static forgetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError(`There is no user with that email ${req.body.email}`, 404));
    } else {

      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedResetCode = crypto.createHash('sha256').update(resetCode).digest('hex');
      user.passwordResetCode = hashedResetCode;
      user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // expired date is 10 min
      user.passwordResetVerified = false;
      await user.save();

      const message = `Hi ${user.name},\n 
    We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;

      try {
        await sendEmail({
          email: user.email,
          subject: 'Your password reset code (valid for 10 min)',
          message,
        });
        res.status(200).json({ status: 'Success', message: 'Reset code sent to email' });

      } catch (err) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;

        await user.save();
        return next(new ApiError('There is an error in sending email', 500));
      }

    }


  })
  static verifyPassResetCode = asyncHandler(async (req, res, next) => {
    const hashedResetCode = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');

    const user = await User.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) { return next(new ApiError('Reset code invalid or expired')); }

    // 2) Reset code valid
    user.passwordResetVerified = true;
    await user.save();

    res.status(200).json({ status: 'Success' });
  });
  static resetPassword = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError(`There is no user with email ${req.body.email}`, 404));
    }
    // 2) Check if reset code verified
    if (!user.passwordResetVerified) {
      return next(new ApiError('Reset code not verified', 400));
    } else {

      user.password = await createHashPassword(req.body.newPassword)
      user.passwordResetCode = undefined;
      user.passwordResetExpires = undefined;
      user.passwordResetVerified = undefined;

      await user.save();

      // 3) if everything is ok, generate token
      const token = createToken(user._id);
      res.status(200).json({ token });
    }
  });


}
module.exports = { AuthController }



