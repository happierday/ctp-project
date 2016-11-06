"use strict";

module.exports = function () {
    const express = require('express');
    const router = express.Router();

    router.post('/validation/domain', (req, res, next) => {
        res.send(true);
    });

    router.get('/*', (req, res, next) => {
        res.render('domain');
    });

    return router;
};