require("dotenv").config()
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {

    const white_list = ["/","/register","/login"]

    if(white_list.find(item => '/v1/api' + item === req.originalUrl)){
        next()
    }
    else{
        if(req?.headers?.authorization?.split(' ')?.[1]){
            const token = req.headers.authorization.split(' ')[1]
            //verify
            try{
                jwt.verify(token, process.env.JWT_SECRET)
                next()
            }
            catch(error){
                //return exception
                return res.status(403).json({
                    message:"Token invalid"
                })
            }
        }
        else{
            //return exception
            return res.status(401).json({
                message:"Authentication"
            })
        }
    }
    
}

module.exports = auth;