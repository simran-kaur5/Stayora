const express = require("express")
const router = express.Router()
const User = require("../models/users") 
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport")
const {saveredirectUrls} = require("../middleware.js")

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup", wrapAsync(async(req,res)=>{
    try{
        let {username,email,password} = req.body
        const newUser = new User({username,email})
        
        let registeredUser = await User.register(newUser,password)
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","Welcome to Stayora")
            res.redirect("/listings")
        })
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }
    
}))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
})

router.post("/login",saveredirectUrls,passport.authenticate("local",{
    failureRedirect: "/login",failureFlash:true}) ,async(req,res)=>{

    req.flash("success","Welcome back")
    let redirectURL = res.locals.redirectURL || "/listings"

    res.redirect(redirectURL)
    
})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err)
        }

        req.flash("success","You are logged out successfully")
        res.redirect("/listings")
    })
})

module.exports = router

