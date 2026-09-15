const moongse = require("mongoose")
const {Schema} = moongse
const passportLocalMongoose = require("passport-local-mongoose").default;


userSchema = Schema({
    email:{
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose) // plugging with this we get functionallity of added username and password(in hash) automatically

module.exports = moongse.model("User",userSchema)

