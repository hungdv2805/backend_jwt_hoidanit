const express = require('express');
const { createUser }  = require('../controllers/userControler')

const routerAPI = express.Router();


routerAPI.get("/",(req, res) => {
    return res.status(200).json('Hello World API')
})

routerAPI.post('/create', createUser)

module.exports = routerAPI; //export default