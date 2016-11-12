/**
 * Created by wei on 11/12/16.
 */
"use strict";

module.exports = function () {
    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res, next) => {
        res.render('dashboard');
    });


    return router;
};
