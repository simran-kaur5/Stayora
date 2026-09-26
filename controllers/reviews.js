const Review = require("../models/reviews.js")
const Listing = require("../models/listings.js")

module.exports.createReview = async(req,res)=>{
    let id = req.params.id;

    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    const list = await Listing.findById(id);

    list.reviews.push(newReview);

    // Save review immediately
    await newReview.save();
    await list.save();
    
    fetch("https://stayora-sentiments.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            review: newReview.comment
        })
    })
    .then(async response => {
        const result = await response.json();

        // Update the SAME review in DB
        const updatedReview = await Review.findByIdAndUpdate(
        newReview._id,
        {
            sentiment: result.sentiment,
            sentimentConfidence: result.confidence
        },
        { returnDocument: "after" }
        );

        if (!updatedReview) {
            console.log("Review was deleted before sentiment analysis finished.");
        }
    })
    .catch(err => {
        console.log("Sentiment error:", err);
    });


    req.flash("success", "Review Saved! Sentiment is being analyzed.")
    res.redirect(`/listings/${id}`)
}


module.exports.destroyReview = async(req,res)=>{
    let {id, reviewId} = req.params
    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`)
}