module.exports.isLoggedIn = (req,res,next)=>{
    console.log(req.path," ",req.originalUrl)
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl
        req.flash("error","Please Login")
        return res.redirect("/login")
    }

    next()
}

module.exports.saveredirectUrls = (req,res,next)=>{
    if(req.session.redirectURL){
        req.locals = req.session.redirectURL
    }
    next()
}