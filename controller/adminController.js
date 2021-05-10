const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const adminUser = await Admin.findOne({ email: email });
    const result = await bcrypt.compare(password, adminUser?.password);
    console.log(result);
    if (adminUser && result) {
      const token = jwt.sign(
        {
          userId: adminUser._id,
          email: adminUser.email,
          username: adminUser.username,
        },
        "rentalkakshsupersecret"
      );
      return res
        .status(200)
        .json({ message: "login Successful", user: adminUser, token });
    }
    return res.status(404).json({ message: "invalid credentials" });
  } catch (err) {
    console.log(err);
  }
};
exports.autoLogin = (req, res, next) => {
  if (req.userInfo) {
    return res
      .status(200)
      .json({ message: "login successfull", user: req.userInfo });
  }
  res.status(404).json({ message: "something went wrong" });
};
// exports.register = async (req, res) => {
//   const { username, email, password } = req.body;
//   if (!(username.trim() && email.trim() && password.trim())) {
//     return res.status(404).json({ message: "empty values not allowed" });
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const admin = new Admin({ username, email, password: hashedPassword });
//     const result = await admin.save();
//     res.status(201).json({ message: "user created", result });
//   } catch (err) {
//     console.log(err);
//   }
// };
