const shortid = require('shortid');
const urlModel = require('../models/urlmodel');


const handleGenerateUrl = async function (req, res) {
    if (!req.body.redirectURL)
        return res.status(400).json({ error: 'URL is required' });

    const shortId = shortid(8);
    await urlModel.create({
        shortId: shortId,
        redirectURL: req.body.redirectURL,
        visitHistory: [],
        createdby: req.user._id,    //user is added in req by auth middleware 
        //user._id : _id is document id from mongodb
    });
    return res.redirect("/");
}

const handleGetUrl = async function (req, res) {
    const shortId = req.params.shortId;
    const entry = await urlModel.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })
    res.redirect(entry.redirectURL);
}

const handleUrlAnalytics = async function (req, res) {
    const shortId = req.params.shortId;
    const urlData = await urlModel.findOne({ shortId });

    return res.json({
        clicksCount: urlData.visitHistory.length,
        analytics: urlData.visitHistory
    });
}

const handleGetAllUrls = async function(req,res){
        if(!req.user)
            return res.redirect("/login");

        const allUrls = await urlModel.find({createdby: req.user._id});
        return res.render("home", {
            urls : allUrls,
        });
}

module.exports = {
    handleGenerateUrl,
    handleGetUrl,
    handleUrlAnalytics,
    handleGetAllUrls,
}