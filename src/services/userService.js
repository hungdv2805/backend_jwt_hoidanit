require("dotenv").config()
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10
var jwt = require('jsonwebtoken');
const createUserService = async (name, email, password) => {
    try {
        // check user exists
        const user = await User.findOne({ email })
        if (user) {
            return {
                EC: 1, // error code
                EM: 'Email da ton tai' // error message
            }
        }
        const hashPassword = await bcrypt.hash(password, saltRounds)
        let result = await User.create({
            name,
            email,
            password: hashPassword,
            role:'admin',
        })
        return {
            EC: 0,
            result
        };

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email })
        if (user){
            const isMatchPassword = await bcrypt.compare(password, user.password)
            if (!isMatchPassword){
                return {
                    EC: 2, // error code
                    EM: 'Email/Password khong hop le' // error message
                }
            }
            else{
                //create a assets token
                const payload = {
                    email: user.email,
                    name: user.name,
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
                return { 
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }  
                }
            }
        } 
        else{
            return {
                EC: 1, // error code
                EM: 'Email/Password khong hop le' // error message
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await User.find({ }).select("-password")
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = {
    createUserService,
    loginService,
    getUserService
}