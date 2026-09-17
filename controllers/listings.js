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
    console.log(list)
    console.log("Owner in " , list.owner._id)
    console.log("CUrr",res.locals.currUser._id)
    if(!list){
        req.flash("error","This listing does not exist")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{list})
}

module.exports.createListings = async(req,res,next)=>{
    const list = new Listing(req.body)
    list.owner = req.user._id
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
    res.render("listings/edit.ejs",{list})
}

module.exports.updateListings = async (req, res) => {
    let id = req.params.id
    console.log(id)
    const newList = await Listing.updateOne({_id:id},{...req.body,
        image: {
            url: req.body.image
        }
        })
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListings = async(req,res)=>{
    let id = req.params.id
    const list = await Listing.findByIdAndDelete({_id:id})

    req.flash("success","Listing got deleted")
    res.redirect("/listings")
}