"use strict";

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('resources');
});

module.exports = router;
