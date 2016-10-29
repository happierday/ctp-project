"use strict";

module.exports = function () {
    const express = require('express');
    const router = express.Router();

    router.get('/create', (req, res, next) => {
        // if (!req.user) {
        //     next(401);
        //     return;
        // }

        res.render('domain-create');
    });

    return router;
};