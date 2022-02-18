const mongoose = require("mongoose")
const schema = mongoose.Schema

const rest = new schema({
title: String,
category: String,
country: String,
year: Number,
<<<<<<< HEAD
director_id: schema.Types.ObjectId,
=======
director: schema.Types.ObjectId,
>>>>>>> main
imdb_score: Number


})

module.exports = mongoose.model("cinema" , rest )