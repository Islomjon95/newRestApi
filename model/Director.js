const mongoose = require("mongoose")
const schema = mongoose.Schema

const director = new schema({
    name: String,
    surname: String,
    bio: String
    
})

module.exports = mongoose.model("foydalanuvchi" , director)