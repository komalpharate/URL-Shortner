const jwt = require("jsonwebtoken");
const secretKey = "Komal$123@$";
//used to verify the token's authenticity

const setUser = function ( userData) {
    return jwt.sign({
        _id:userData._id,
        email: userData.email,
        role: userData.role,
    }, secretKey);   
} 
const getUser = function (token) {
    if (!token)
        return null;
    try {
        return jwt.verify(token, secretKey);
    } catch(error) {
        return null;
    }
}
module.exports = {
    setUser,
    getUser,
}