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
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}

async function insertion(){
    await Listing.deleteMany();
    const listings = initialize.data.map((obj) => ({
    ...obj,
    owner: "6aa93f93f209e698ffa0d322"
}));

    await Listing.insertMany(listings);
    console.log("Database initialized")
}

insertion()