const express = require("express")
const router = express.Router()
const {listingSchema}  = require("../schema.js")
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listings")

const validateList = (req,res,next)=>{
    let body = req.body
    let {error} = listingSchema.validate(body)
    if(error){
        let errMessage = error.details.map((el)=> el.message).join(",")  // send extra details of error
        throw new ExpressError(400,errMessage)
    }else{
        next()
    }
}


router.get("/", wrapAsync(async (req, res) => {
    const listing = await Listing.find({});
    res.render("listings/index.ejs",{listing}) 
}))


router.get("/new",(req,res)=>{
    res.render("listings/create.ejs")
})

router.post("/",validateList,
    wrapAsync(async(req,res,next)=>{
    const list = new Listing(req.body)
    await list.save();
    res.redirect("/listings")
}))

router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let id = req.params.id
    let list = await Listing.findById(id)
    res.render("listings/edit.ejs",{list})
}))

router.get("/:id", wrapAsync(async (req, res) => {
    let id = req.params.id
    const list = await Listing.findById(id).populate("reviews")
    res.render("listings/show.ejs",{list})
}))

router.patch("/:id",validateList,
    wrapAsync(async (req, res) => {
    let id = req.params.id
    const newList = await Listing.updateOne({_id:id},{...req.body,
        image: {
            url: req.body.image
        }
        })
    res.redirect(`/listings/${id}`)
}))

router.delete("/:id/delete",wrapAsync(async(req,res)=>{
    let id = req.params.id
    const list = await Listing.findByIdAndDelete({_id:id})
    res.redirect("/listings")
}))

module.exports = router