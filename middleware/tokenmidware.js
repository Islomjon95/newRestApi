const jwt = require("jsonwebtoken")

module.exports = (req, res, next)=>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token
    if(token){
        jwt.verify(token , "SecretKey" , (err , decoded)=>{
            if(err){
                console.log(err);
                res.json({
                    status : 404, 
                    message : "Token vaqti expired 😜"
                })
            }
            else{
                req.decoded = decoded
                next()
            }
        })
    }
    else{
        res.json({
            status: false,
            message: "Registratsiyadan o'ting"
        })
    }
}

