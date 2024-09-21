const { getUser } = require('../services/auth');

const checkAuthentication = function(req, res, next){
    const tokencookie = req.cookies?.token;
    req.user = null;
    if(!tokencookie) 
        return next();

    const usr = getUser(tokencookie);
    if(!usr) 
        return res.redirect("/login");
    req.user = usr;
    next();
}

const restrictTo = function(role){
    return function(req,res, next){
        // console.log("Role:", role);

        if(!req.user)
            return res.redirect("/login");
        if(!role.includes(req.user.role))
            return res.end("Unauthorised !");
        return next();
    }
}

module.exports = {
    checkAuthentication,
    restrictTo,
}