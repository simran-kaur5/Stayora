const Review = require("../models/reviews.js")
const Listing = require("../models/listings.js")

module.exports.createReview = async(req,res)=>{
    let id = req.params.id
    let newReview= new Review(req.body.review)  

    let reviewText = newReview.comment
    
    const response = await fetch("https://stayora-sentiments.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            review: reviewText
        })
    });

    const result = await response.json();
    console.log()
    console.log(result)
    newReview.sentiment = result.sentiment
    newReview.sentimentConfidence = result.confidence

    console.log(newReview)

    // console.log(result)
    // assign curr user as author of review
    newReview.author = req.user._id

    const list = await Listing.findById(id)
    list.reviews.push(newReview)

    await newReview.save()
    await list.save()
    req.flash("success","Review Saved")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyReview = async(req,res)=>{
    let {id, reviewId} = req.params
    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`)
}