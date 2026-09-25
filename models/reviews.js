const { date } = require("joi")
const mongoose = require("mongoose")
const {Schema} = mongoose


const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: String,
        min:1,
        max:5
    },

    createdAt: {
        type: Date,
        default: Date(Date.now())
    },

    author:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    sentiment: {
    type: String,
    enum: ["positive", "negative"]
    },

    sentimentConfidence: {
        type: Number
    }
})

module.exports = mongoose.model("Review",reviewSchema)