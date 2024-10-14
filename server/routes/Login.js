const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/Login");


router.post("/login", LoginController.postLogin);
router.post("/logout", LoginController.postLogout);

router.post('/register', LoginController.PostRegister)

router.post("/verify-otp", LoginController.postVerifyOtp)

module.exports = router;
