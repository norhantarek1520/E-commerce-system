const {validationResult}= require("express-validator");

module.exports =  validatorMiddleware = (req, res , next) => {
    const error = validationResult(req);
    if ( !error.isEmpty()) {
      return res.status(404).json({"Error":error.array()})
    }
    next()
}
