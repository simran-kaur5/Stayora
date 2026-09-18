const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Review = require("./reviews.js")

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        url:String,
        filename: String
    },
    description:String,
    price:Number,
    location:String,
    country:String,
    reviews :[
        {
            type: Schema.Types.ObjectId,
            ref : "Review"
        }
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


// when ever any listings will deleted its corresponding reviews will also be deleted
listingSchema.post("findOneAndDelete",async (listing)=>{
    console.log("del")
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

const Listing = mongoose.model("Listing",listingSchema)
module.exports = Listing