const joi = require("joi")

const listingSchema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow("",null),
        country: joi.string().required(),
        location: joi.string().required(),
        category: joi.string().valid("Trending","Iconic","Mountains","Rooms","Castles","Pools","Camping","Farms","Arctic","Domes","Boats").required()
})

const reviewSchema = joi.object({
        review: joi.object({
                comment: joi.string().required(),
                rating: joi.number().required().min(1).max(5)
        }).required()
})

module.exports = {
    listingSchema,
    reviewSchema
};