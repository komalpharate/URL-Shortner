const express = require('express');
const { handleGenerateUrl,
    handleGetUrl,
    handleUrlAnalytics,
    handleGetAllUrls,
 } = require('../controllers/urlcontroller');

//Router
const router = express.Router();

router.get('/', handleGetAllUrls);
router.get('/:shortId',handleGetUrl);
router.get('/:shortId/analytics', handleUrlAnalytics);

router.post('/', handleGenerateUrl);

module.exports = router;