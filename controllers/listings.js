const Listing = require("../models/listings")

module.exports.index = async (req, res) => {
    const listing = await Listing.find({});
    res.render("listings/index.ejs",{listing}) 
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
    // console.log(list)
    res.render("listings/show.ejs",{list})
}

module.exports.createListings = async(req,res,next)=>{
    let url = req.file.path
    let filename = req.file.filename

    const list = new Listing(req.body)
    list.owner = req.user._id
    list.image = {url,filename}
    await list.save();
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
    // console.log(id)
    const newList = await Listing.findByIdAndUpdate(id,{...req.body})
    console.log(newList)

    if(typeof req.file !== "undefined"){
        let url = req.file.path
        let filename = req.file.filename

        newList.image = {url,filename}
    }
    console.log(newList.image)
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