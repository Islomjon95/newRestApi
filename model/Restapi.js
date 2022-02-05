const mongoose = require("mongoose")
const schema = mongoose.Schema

const rest = new schema({
title: String,
category: String,
country: String,
year: Number,
director: schema.Types.ObjectId,
imdb_score: Number


})

module.exports = mongoose.model("RestApi" , rest )