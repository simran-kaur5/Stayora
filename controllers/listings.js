const Listing = require("../models/listings")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    let category = req.query.category

    if(category){
        const listing = await Listing.find({category}); 
        res.render("listings/index.ejs",{listing}) 
    }else{
        const listing = await Listing.find({});
        res.render("listings/index.ejs",{listing}) 
    }
}

module.exports.newForm = (req,res)=>{
    res.render("listings/create.ejs")
}

module.exports.showListings = async (req, res) => {
    let id = req.params.id
    const list = await Listing.findById(id).populate({path:"reviews",populate:{
        path: "author" // we want author name 
        },
    })
    .populate("owner")
    if(!list){
        req.flash("error","This listing does not exist")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{list})
}

module.exports.createListings = async(req,res,next)=>{
    let response = await geocodingClient
    .forwardGeocode({
        query: req.body.location,
        limit:1
    })
    .send()

    let url = req.file.path
    let filename = req.file.filename

    const list = new Listing(req.body)
    list.owner = req.user._id
    list.image = {url,filename}
    list.geometry = response.body.features[0].geometry
    let savedLis = await list.save();
    req.flash("success","Listing added successfully")
    res.redirect("/listings")
}

module.exports.renderEditForm = async (req,res)=>{
    let id = req.params.id
    let list = await Listing.findById(id)

    if(!list){
        req.flash("error","This listing does not exist")
        return res.redirect("/listings")
    }
    let OrgImageUrl = list.image.url
    OrgImageUrl = OrgImageUrl.replace("/upload","/upload/h_300")
    res.render("listings/edit.ejs",{list,OrgImageUrl})
}

module.exports.updateListings = async (req, res) => {
    let id = req.params.id
    const newList = await Listing.findByIdAndUpdate(id,{...req.body})

    if(typeof req.file !== "undefined"){
        let url = req.file.path
        let filename = req.file.filename

        newList.image = {url,filename}
    }
    await newList.save()
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListings = async(req,res)=>{
    let id = req.params.id
    const list = await Listing.findByIdAndDelete({_id:id})

    req.flash("success","Listing got deleted")
    res.redirect("/listings")
}