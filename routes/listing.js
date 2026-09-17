const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listings")
const {isLoggedIn,isOwner,validateList} = require("../middleware.js")
const listingController = require("../controllers/listings.js")


router
    .route("/") //helps us to right multiple http req for same path at one place 
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        validateList,
    wrapAsync(listingController.createListings))

router.get("/new",isLoggedIn,listingController.newForm)

router
    .route("/:id")
    .get(isLoggedIn, wrapAsync(listingController.showListings))
    .patch(isLoggedIn, // check whether user is logged in
    isOwner,//permission to edit
    validateList,
    wrapAsync(listingController.updateListings))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListings))


router.get("/:id/edit",
    isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))


module.exports = router