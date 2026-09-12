const express = require("express")
const mongoose = require("mongoose")

const app = express()
const Listing = require("./models/listings")
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")

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

app.get("/listings", async (req, res) => {
    const listing = await Listing.find({});
    res.render("listings/index.ejs",{listing}) 
})


app.get("/listings/new",(req,res)=>{
    res.render("listings/create.ejs")
})

app.post("/listings",async(req,res)=>{
    let body = req.body
    const list = new Listing(body)
    await list.save();
    res.redirect("/listings")
})

app.get("/listings/:id/edit",async (req,res)=>{
    let id = req.params.id
    let list = await Listing.findById(id)
    res.render("listings/edit.ejs",{list})
})

app.get("/listings/:id", async (req, res) => {
    let id = req.params.id
    const list = await Listing.findById(id)
    res.render("listings/show.ejs",{list})
})

app.patch("/listings/:id", async (req, res) => {
    let id = req.params.id
    const newList = await Listing.updateOne({_id:id},{...req.body,
        image: {
            url: req.body.image
        }
        })
    res.redirect(`/listings/${id}`)
})

app.delete("/listings/:id/delete",async(req,res)=>{
    let id = req.params.id
    const list = await Listing.findByIdAndDelete({_id:id})
    console.log(Listing.listSearchIndexes)
    res.redirect("/listings")
})

// app.get("/testListings", async (req,res)=>{
//     let sampleListing = new Listing({
//         tirle:"My new villa",
//         description:"by the beach",
//         price:1200,
//         location:"Goa",
//         country:"india"
//     })

//     await sampleListing.save();
//     console.log("sample saved")
//     res.send("Sucess")
// })


app.listen(8080,()=>{
    console.log("server listening")
})