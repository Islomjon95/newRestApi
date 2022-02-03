const express = require("express")
const router = express.Router()
const rest = require("../model/Restapi")


router.get("/" , (req, res)=>{
    rest.find({} , (err , data)=>{
        if (err) {
            console.log(err);
        }
        else{
            res.json(data)
        }
    })
})

router.post("/" , (req, res)=>{
    const db = new rest({
        title: req.body.title,
        category: req.body.category,
        country: req.body.country,
        year: req.body.year,
        director: req.body.director,
        imdb_score: req.body.imdb_score
    })
    db.save((err, data)=>{
        if (err) {
            console.log(err);
        }else{
            res.json(data)
        }
    })
})

router.get("/:movie_id" , (req, res)=>{
    rest.findById(req.params.id , (err, data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data)
        }
    })
})




module.exports = router