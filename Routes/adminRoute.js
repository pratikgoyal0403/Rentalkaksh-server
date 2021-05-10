const router = require("express").Router();

const adminController = require("../controller/adminController");
const isAuth = require("../middleware/isAuth");

router.post("/admin/login", adminController.login);
router.get("/admin/autoLogin", isAuth, adminController.autoLogin);
// router.post('/admin/register', adminController.register)

module.exports = router;
