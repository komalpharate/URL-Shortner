const User = require('../models/usermodel');
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require('../services/auth')

const handlerUserSignup = async function (req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/login");
}
const handlerUserLogin = async function (req, res) {
    const { email, password } = req.body;
    const userData = await User.findOne({
        email,
        password,
    });
    if(!userData){
        return res.render("login",{
            error: "Invalid username or password",
        });
    }

    const token = setUser(userData);
    //set cookies: browser stores the cookies sent by server
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {
    handlerUserSignup,
    handlerUserLogin,
}