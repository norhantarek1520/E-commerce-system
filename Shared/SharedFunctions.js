const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');





exports.getUserId = (token)=>{
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.userId;

    return userId ;
}
exports.createToken = (payload) =>{
    
    return jwt.sign({ userId: payload }, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRE_TIME,});

}
exports.sendEmail = async (options) => {
  // 1) Create transporter ( service that will send email like "gmail")
  const transporter = nodemailer.createTransport({
    service : 'gmail' ,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define email options (like from, to, subject, email content)
  const mailOpts = {
    from: process.env.EMAIL_USER ,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send email
  await transporter.sendMail(mailOpts);
};
exports.createHashPassword =async (password)=>{
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return  hash ;
}
