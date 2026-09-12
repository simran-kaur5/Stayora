const express = require("express")
const mongoose = require("mongoose")

const app = express()
const Listing = require("./models/listings")
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")

app.use(methodOverride("_method"));
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))


main().then((result)=>{
    console.log("Sucess")
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}

app.get("/",(req,res)=>{
    res.send("got res")
})

app.get("/listings", wrapAsync(async (req, res) => {
    const listing = await Listing.find({});
    res.render("listings/index.ejs",{listing}) 
}))


app.get("/listings/new",(req,res)=>{
    res.render("listings/create.ejs")
})

app.post("/listings",wrapAsync(async(req,res,next)=>{
    let body = req.body
    if(!body){
        throw new ExpressError(400,"Send valid data for listing")
    }
    if(!body.title){
        throw new ExpressError(400,"Title not got")
    }
    if(!body.description){
        throw new ExpressError(400,"Description not got")
    }
    if(!body.price){
        throw new ExpressError(400,"Price not got")
    }
    if(!body.country){
        throw new ExpressError(400,"Country not got")
    }
    if(!body.location){
        throw new ExpressError(400,"Location not got")
    }
    console.log(body)
    const list = new Listing(body)
    await list.save();
    res.redirect("/listings")
}))

app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let id = req.params.id
    let list = await Listing.findById(id)
    res.render("listings/edit.ejs",{list})
}))

app.get("/listings/:id", wrapAsync(async (req, res) => {
    let id = req.params.id
    const list = await Listing.findById(id)
    res.render("listings/show.ejs",{list})
}))

app.patch("/listings/:id", wrapAsync(async (req, res) => {
    if(!req.body){
        throw new ExpressError(400,"Send valid data for listing")
    }
    let id = req.params.id
    const newList = await Listing.updateOne({_id:id},{...req.body,
        image: {
            url: req.body.image
        }
        })
    res.redirect(`/listings/${id}`)
}))

app.delete("/listings/:id/delete",wrapAsync(async(req,res)=>{
    let id = req.params.id
    const list = await Listing.findByIdAndDelete({_id:id})
    console.log(Listing.listSearchIndexes)
    res.redirect("/listings")
}))

// if no any route matches
app.all("/*splat",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found!"))
})

// Error handler middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"} = err
    console.log("error")
    console.log(message)
    res.status(statusCode).render("listings/errors.ejs",{message})
    // res.status(statusCode).send(message)
})


app.listen(8080,()=>{
    console.log("server listening")
})