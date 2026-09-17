const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listings")
const {isLoggedIn,isOwner,validateList} = require("../middleware.js")
const listingController = require("../controllers/listings.js")


router.get("/", wrapAsync(listingController.index))


router.get("/new",isLoggedIn,listingController.newForm)

router.post("/",validateList,
    isLoggedIn,
    wrapAsync(listingController.createListings))

router.get("/:id/edit",
    isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))

router.get("/:id",isLoggedIn, wrapAsync(listingController.showListings))

router.patch("/:id",isLoggedIn, // check whether user is logged in
    isOwner,//permission to edit
    validateList,
    wrapAsync(listingController.updateListings))

router.delete("/:id/delete",isLoggedIn,isOwner,wrapAsync(listingController.destroyListings))

module.exports = router