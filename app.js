
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

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
const MongoStore = require("connect-mongo").default
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/users")
const multer = require("multer") //to handle file uploaded
const upload = multer({dest:"upload/"})

const dbUrl = process.env.ATLASDB_URL

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

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600
})

store.on("error",()=>{
    console.log("Error in store")
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly:true
    }
}

app.get("/",(req,res)=>{
    res.redirect("/listings")
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

async function main() {
    await mongoose.connect(dbUrl);
}


app.use("/listings",listingRouter)

app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)

// if no any route matches
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page not Found!"))
})

// Error handler middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"} = err
    res.status(statusCode).render("listings/errors.ejs",{message})
    // res.status(statusCode).send(message)
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("server listening")
})