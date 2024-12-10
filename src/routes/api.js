const express = require('express');
const { createUser, handleLogin, getUser, getAcount }  = require('../controllers/userControler')
const auth = require('../middleware/auth')
const delay = require('../middleware/delay')
const routerAPI = express.Router();

//routerAPI.get("*", delay) // only methods GET
routerAPI.all("*", auth)

routerAPI.get("/", (req, res) => {
    return res.status(200).json('Hello World API')
})

routerAPI.post('/register', createUser)

routerAPI.post('/login', handleLogin)

routerAPI.get('/user', getUser)

routerAPI.get('/account', delay, getAcount)


module.exports = routerAPI; //export default