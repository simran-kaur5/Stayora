const express = require("express")
const mongoose = require("mongoose")

const app = express()
const Listing = require("./models/listings")
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js")
const listingSchema  = require("./schema.js")
const Review = require("./models/reviews.js")
const reviewSchema  = require("./schema.js")
const listingRouter = require("./routes/listing.js") //router for listings
const reviewRouter = require("./routes/review.js") //router for reviews
const userRouter = require("./routes/user.js") //router for reviews
const sessions = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users")


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

const sessionOptions = {
    secret: "mysecretkey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly:true
    }
}

app.get("/",(req,res)=>{
    res.send("got res")
})

app.use(sessions(sessionOptions))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user

    next();
});
app.get("/demouser",async(req,res)=>{
    let fakeUser = new User({
        email:"mari",
        username:"Simran"
    })

    let resl = await User.register(fakeUser,"helloword");
    console.log(resl)
    res.send(resl)
})


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/project');
}


app.use("/listings",listingRouter)

app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)

// if no any route matches
app.all("/*splat",(req,res,next)=>{
    console.log("all")
    next(new ExpressError(404,"Page not Found!"))
})

// Error handler middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"} = err
    console.log("error handling middle ware",message)
    res.status(statusCode).render("listings/errors.ejs",{message})
    // res.status(statusCode).send(message)
})


app.listen(8080,()=>{
    console.log("server listening")
})