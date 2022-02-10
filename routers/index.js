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
    const {title, category, country, year, director_id, imdb_score} = req.body
    const db = new rest({
        title: title,
        category: category,
        country: country,
        year: year,
        director_id: director_id,
        imdb_score: imdb_score
    })
    const promise = db.save()
    promise.then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get("/:movie_id" , (req, res)=>{
    rest.findById(req.params.movie_id , (err, data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data)
        }
    })
})


router.put("/:movie_id" , (req, res)=>{
    rest.findByIdAndUpdate(req.params.movie_id , req.body, (err, data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(data)
        }
    })
})

router.delete("/:movie_id" , (req, res)=>{
    const promise = rest.findByIdAndRemove(req.params.movie_id)
    promise.then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
    })
})


router.get("/top/top10" , (req, res)=>{
    const promise = rest.find({}).sort({imdb_score: -1}).limit(4)
    promise.then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get("/between/:start_year/:end_year", (req, res)=>{
    const {start_year , end_year} = req.params
    const promise = rest.find({
        year: {'$gte': (start_year) , '$lte':(end_year)}
    })

    promise.then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
    })
})



module.exports = router