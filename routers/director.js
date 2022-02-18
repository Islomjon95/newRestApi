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
                as: "filmlar"
            }
        },

        {
            $unwind:{
                path: "$filmlar"
            }
        },

        {
            $group:{
                _id:{
                    _id: "$_id",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                flimlar: {
                    $push: "$filmlar"
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