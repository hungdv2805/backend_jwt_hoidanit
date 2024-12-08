const express = require('express');
const { createUser, handleLogin, getUser }  = require('../controllers/userControler')

const routerAPI = express.Router();


routerAPI.get("/",(req, res) => {
    return res.status(200).json('Hello World API')
})

routerAPI.post('/register', createUser)

routerAPI.post('/login', handleLogin)

routerAPI.get('/user', getUser)


module.exports = routerAPI; //export default