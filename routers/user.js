const express = require('express')
const router = express.Router()
const userdb = require("../model/User")
const bcryptjs = require("bcryptjs")
const jwt =  require("jsonwebtoken")
const { api_secret_key } = require('../config')


router.get("/" , (req, res)=>{
    res.render("index")
})

router.post("/" , (req, res)=>{
    const {username , password} = req.body
    bcryptjs.hash(password , 10 , (err , hash)=>{
        const db = new userdb({
            username, 
            password: hash
        })
    
        const promise = db.save()
        promise.then(data=>{
            
            res.render("user")
            
        }).catch(err=>{
            console.log(err);
        })
    })
 
})

router.get("/user/aut" , (req, res)=>{
    res.render("user")
})

router.post("/user/aut" , (req, res)=>{
    const{username , password} = req.body
    userdb.findOne({username} , (err , data)=>{
        if(err) throw err
        if(!data){
            res.render("error")
        }
        else{
            bcryptjs.compare(password , data.password)
            .then(userpass=>{
                if (!userpass) {
                    res.render("error")
                }
                else{
                    const payload = {username}
                    const token = jwt.sign(payload , "SecretKey")  //ExpiresIn bor edi;
                    res.send(token)
                    
                }
            })
        }
    })
})

module.exports = router;