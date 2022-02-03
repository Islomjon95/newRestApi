const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const port = 3000
const rIndex = require("./routers/index")

mongoose.connect("mongodb+srv://islomjon:islomjon95@cluster0.wdd8j.mongodb.net/test")

const db = mongoose.connection

db.on("open" , ()=>{
    console.log("Mongo running");
})

db.on("error" , (err)=>{
    console.log(err);
})

app.set("view engine" , "pug")

app.use(express.static(path.join(__dirname , "public")))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api/movies",rIndex)

app.listen(port, ()=>{
    console.log("Server running");
})

