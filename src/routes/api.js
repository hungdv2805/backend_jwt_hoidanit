const express = require('express');
const { createUser, handleLogin, getUser }  = require('../controllers/userControler')
const auth = require('../middleware/auth')

const routerAPI = express.Router();

//routerAPI.get("*", delay) // only methods GET
routerAPI.all("*", auth)

routerAPI.get("/", (req, res) => {
    return res.status(200).json('Hello World API')
})

routerAPI.post('/register', createUser)

routerAPI.post('/login', handleLogin)

routerAPI.get('/user', getUser)


module.exports = routerAPI; //export default