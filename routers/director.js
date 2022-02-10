const express = require("express")
const router = express()
const director = require("../model/Director")


// router.get("/" , (req, res)=>{
//     const promise = director.find({})
//      promise.then(data=>{
//          res.json(data)
//      }).catch(err=>{
//          console.log(err);
//      })
// })

router.post("/api/directors" , (req, res)=>{
    const db = new director(req.body)
    const promise = db.save()
    promise.then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
    })
})

router.get("/api/directors" , (req, res)=>{
    const promise = director.aggregate([
        {
            $lookup:{
                from: "cinemas",
                localField: "_id",
                foreignField: "director_id",
                as: "cinema"
            }
        },

        {
            $unwind:{
                path: "$cinema"
            }
        },

        {
            $group:{
                _id:{
                    _id: "$push",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                cinemas: {
                    $push: "$cinema"
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

module.exports = router