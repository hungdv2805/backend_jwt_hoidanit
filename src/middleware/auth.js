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
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = {
                    email: decoded.email,
                    name: decoded.name
                }
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


// co van de khi xoa localstorage da xoa nhung van con thoi hạn thi ben BE van cho di vao binh thuong