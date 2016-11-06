"use strict";

module.exports = function () {
    const express = require('express');
    const router = express.Router();

    /* GET home page. */
    router.get('/', (req, res, next) => {
        res.render('index', {title: 'Plady'});
    });

    return router;
};
