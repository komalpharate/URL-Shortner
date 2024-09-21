const express = require('express');
const staticRouter = express.Router();
const urlModel = require('../models/urlmodel');
const { restrictTo } = require('../middlewares/auth');

staticRouter.get('/admin/urls', restrictTo(["ADMIN"]), async(req, res)=>{
    const allUrls = await urlModel.find({});
    return res.render("home", {
        urls : allUrls,
    });
});

staticRouter.get('/', restrictTo(["NORMAL","ADMIN"]), async(req, res)=>{
    const allUrls = await urlModel.find({createdby: req.user._id});
    return res.render("home", {
        urls : allUrls,
    });
});

staticRouter.get('/signup', (req, res)=>{
    return res.render("signup");
});

staticRouter.get('/login', (req, res)=>{
    return res.render("login");
});
module.exports = staticRouter;
