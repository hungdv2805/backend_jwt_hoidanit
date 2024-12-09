const delay = (req, res, next) => {
    if(url == login) next
    if(req.headers.authorization){
        const token = req.headers.authorization.split('')[1]
    }
    setTimeout(()=>{
        next()
    }, 3000);
}

module.exports = delay;