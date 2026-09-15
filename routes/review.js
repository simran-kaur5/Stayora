const express = require("express")
const router = express.Router({mergeParams:true}) //merge params merge whole path as :id are in app.js
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Review = require("../models/reviews.js")
const {reviewSchema}  = require("../schema.js")
const Listing = require("../models/listings")


const validateReview = (req,res,next)=>{
    let body = req.body
    let {error} = reviewSchema.validate(body)
    if(error){
        let errMessage = error.details.map((el)=> el.message).join(",")
        throw new ExpressError(400,errMessage)
    }else{
        next()
    }
}


// post req for reviews
router.post("/",validateReview, wrapAsync(async(req,res)=>{
    let id = req.params.id
    let newReview= new Review(req.body.review)
    console.log(newReview)

    const list = await Listing.findById(id)
    list.reviews.push(newReview)

    await newReview.save()
    await list.save()
    req.flash("success","Review Saved")
    console.log("Reviews saved")
    res.redirect(`/listings/${id}`)
}))

router.delete("/:reviewId", wrapAsync(async(req,res)=>{
    let {id, reviewId} = req.params

    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`)
}))

module.exports = router
