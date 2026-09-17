const Review = require("../models/reviews.js")
const Listing = require("../models/listings.js")

module.exports.createReview = async(req,res)=>{
    let id = req.params.id
    let newReview= new Review(req.body.review)
    
    // assign curr user as author of review
    newReview.author = req.user._id
    console.log(newReview)

    const list = await Listing.findById(id)
    list.reviews.push(newReview)

    await newReview.save()
    await list.save()
    req.flash("success","Review Saved")
    console.log("Reviews saved")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyReview = async(req,res)=>{
    console.log(req.params)
    let {id, reviewId} = req.params
    console.log(id)

    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`)
}