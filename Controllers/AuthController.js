const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
class AuthController{

static register = asyncHandler(async(req , res , next)=>{
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    
      // 2- Generate token

      const token = jwt.sign({ userId: user._id },
         process.env.JWT_KEY,
        {expiresIn: process.env.JWT_EXPIRE_TIME,});
      

    
      res.status(201).json({ token });
});

static login = asyncHandler(async(req , res , next)=>{
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Incorrect email or password', 401));
  }
  // 3) generate token
   const token = jwt.sign({ userId: user._id },
    process.env.JWT_KEY,
   {expiresIn: process.env.JWT_EXPIRE_TIME,});
 

  // Delete password from response
  delete user._doc.password;
  // 4) send response to client side
  res.status(200).json({ token });

})

static logout = asyncHandler(async(req , res , next)=>{
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

static forgetPassword = asyncHandler(async(req , res , next)=>{})

static verifyPassResetCode = asyncHandler(async(req , res , next)=>{})

static resetPassword = asyncHandler(async(req , res , next)=>{})

}
module.exports={AuthController}