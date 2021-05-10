const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split('=').pop();
  let decode;
    try{
        decode = jwt.verify(token, 'rentalkakshsupersecret')
    }catch(err) {
        console.log(err)
    }
    if(!decode){
        return res.status(404).json({message: "token expired"});
    }
    req.userInfo = decode;
    next();
};
