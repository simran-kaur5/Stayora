const express = require("express")
const chatController = require("../controllers/chat.js")

const router = express.Router()

const {isLoggedIn} = require("../middleware.js")


router
    .route("/")
    .get(isLoggedIn,chatController.showChat)
    .post(isLoggedIn,chatController.startChat)


module.exports = router