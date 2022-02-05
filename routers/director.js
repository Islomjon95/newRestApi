const express = require("express")
const router = express()
const director = require("../model/Director")


router.get("/" , (req, res)=>{
    const promise = director.find({})
     promise.then(data=>{
         res.json(data)
     }).catch(err=>{
         console.log(err);
     })
})

router.post("/" , (req, res)=>{
    const db = new director(req.body)
    const promise = db.save()
    promise.then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})

router.get("/" , (req, res)=>{
    const promise = director.aggregate([
        {
            $lookup:{
                from: "RestApis",
                localField: "_id",
                foreignField: "director_id",
                ass: "film"
            }
        },

        {
            $unwind:{
                path: "film"
            }
        },

        {
            $group:{
                _id:{
                    _id: "push",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                films: {
                    $push: "$film"
                }
            }
        }
    ])

    promise.then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})