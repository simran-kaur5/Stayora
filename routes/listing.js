const express = require("express")
const router = express.Router()
const {listingSchema}  = require("../schema.js")
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listings")
const {isLoggedIn} = require("../middleware.js")

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


router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/create.ejs")
})

router.post("/",validateList,
    isLoggedIn,
    wrapAsync(async(req,res,next)=>{
    const list = new Listing(req.body)
    await list.save();
    req.flash("success","Listing added successfully")
    res.redirect(req.session.redirectURL)
}))

router.get("/:id/edit",isLoggedIn,wrapAsync(async (req,res)=>{
    let id = req.params.id
    let list = await Listing.findById(id)

    if(!list){
        req.flash("error","This listing does not exist")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{list})
}))

router.get("/:id", wrapAsync(async (req, res) => {
    let id = req.params.id
    const list = await Listing.findById(id).populate("reviews")
    if(!list){
        req.flash("error","This listing does not exist")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{list})
}))

router.patch("/:id",isLoggedIn,validateList,
    wrapAsync(async (req, res) => {
    let id = req.params.id
    const newList = await Listing.updateOne({_id:id},{...req.body,
        image: {
            url: req.body.image
        }
        })
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`)
}))

router.delete("/:id/delete",isLoggedIn,wrapAsync(async(req,res)=>{
    let id = req.params.id
    const list = await Listing.findByIdAndDelete({_id:id})

    req.flash("success","Listing got deleted")
    res.redirect("/listings")
}))

module.exports = router