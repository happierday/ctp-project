"use strict";

let express = require('express');
let router = express.Router();

/* GET Public Profile */
router.get('/', (req, res, next) => {
    res.render('public_profile', {username: 'John Doe', degrees: "Ph.D Fishing"});
});

/* GET Shared User Content. */
router.get('/sharedContent', (req, res, next) => {
    res.render('shared_content');
});

module.exports = router;