const mongoose = require("mongoose")
const schema = mongoose.Schema

const userdb = new schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("CreateUser" , userdb)