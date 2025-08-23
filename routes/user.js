const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const userController = require("../controllers/users.js");
const user = require("../models/user.js");

router.get("/signup", userController.renderSignupForm);

// Signup Route
router.post("/signup",wrapAsync(userController.signup));

// Login Route
router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl ,passport.authenticate("local",{ failureRedirect: "/login" , failureFlash: true }) , userController.login);

//logout functionality
router.get("/logout",userController.logout);

module.exports = router;
