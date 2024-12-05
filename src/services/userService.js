const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10

const createUserService = async (name, email, password) => {
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds)
        let result = await User.create({
            name,
            email,
            password: hashPassword,
            role:'admin',
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}





module.exports = {
    createUserService
}