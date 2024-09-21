const express = require('express');

const { handlerUserSignup,
    handlerUserLogin
 } = require('../controllers/usercontroller');

const router = express.Router();

router.post("/", handlerUserSignup);
router.post("/login", handlerUserLogin);

module.exports = router;