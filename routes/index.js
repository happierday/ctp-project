"use strict";

module.exports = function () {
    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res, next) => {
        res.render('index');
    });


    return router;
};
