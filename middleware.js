const Listing = require("./models/listings.js")
const ExpressError = require("./utils/ExpressError.js")
const Review = require("./models/reviews.js")
const wrapAsync = require("./utils/wrapAsync.js")
const {listingSchema,reviewSchema}  = require("./schema.js")


module.exports.validateList = (req,res,next)=>{
    let body = req.body
    let {error} = listingSchema.validate(body)
    if(error){
        let errMessage = error.details.map((el)=> el.message).join(",")  // send extra details of error
        throw new ExpressError(400,errMessage)
    }else{
        next()
    }
}

module.exports.validateReview = (req,res,next)=>{
    let body = req.body
    let {error} = reviewSchema.validate(body)
    if(error){
        let errMessage = error.details.map((el)=> el.message).join(",")
        throw new ExpressError(400,errMessage)
    }else{
        next()
    }
}

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.originalUrl
        req.flash("error","Please Login")
        return res.redirect("/login")
    }

    next()
}

module.exports.saveredirectUrls = (req,res,next)=>{
    if(req.session.redirectURL){
        res.locals.redirectURL = req.session.redirectURL
    }
    next()
}

module.exports.isOwner = async(req,res,next)=>{
    let id = req.params.id;
    let listings = await Listing.findById(id)

    if(!listings.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permissions")
        return res.redirect(`/listings/${id}`)
    }
    next()
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId)
    console.log(review.author)

    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this request")
        return res.redirect(`/listings/${id}`)
    }
    next()
}