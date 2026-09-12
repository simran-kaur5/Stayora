const mongoose = require("mongoose")

const initialize = require("./data.js")

const Listing = require("../models/listings")

main().then((result)=>{
    console.log("Sucess")
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/project');
}


async function insertion(){
    Listing.deleteMany(),
    Listing.insertMany(initialize.data)
    console.log("Database initialized")
}

insertion()