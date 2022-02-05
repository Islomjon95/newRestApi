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
    
    const db = new rest(req.body)
        
    db.save((err, data)=>{
        if (err) {
            console.log(err);
        }else{
            res.json(data)
        }
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
    const promise = rest.findByIdAndUpdate(req.params.movie_id , req.body)
    promise.then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})


router.delete("/:movie_id" , (req, res)=>{
    const promise = rest.findByIdAndRemove(req.params.movie_id)
    promise.then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})

router.get("/top/top10" , (req, res)=>{
    const promise = rest.find({}).sort({imdb_score: 1}).limit(4)
    promise.then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})



module.exports = router