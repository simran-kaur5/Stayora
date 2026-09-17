const express = require("express")
const router = express.Router()
const User = require("../models/users") 
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport")
const {saveredirectUrls} = require("../middleware.js")
const userController = require("../controllers/users.js")

router.get("/signup",userController.renderSignUpForm)

router.post("/signup", wrapAsync(userController.signUp))

router.get("/login",userController.renderLoginForm)

router.post("/login",saveredirectUrls,passport.authenticate("local",{
    failureRedirect: "/login",failureFlash:true}) ,(userController.login))

router.get("/logout",(userController.logout))

module.exports = router

