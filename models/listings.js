const mongoose = require("mongoose")
const Schema = mongoose.Schema

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    image:{
        filename: String,
        url: {
        type: String,
        default: "https://images.unsplash.com/photo-1500534623283-312aade485b7"
        },
    },
    description:String,
    price:Number,
    location:String,
    country:String
})

const Listing = mongoose.model("Listing",listingSchema)
module.exports = Listing