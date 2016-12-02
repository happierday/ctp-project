"use strict";

module.exports = function (Domain) {
    const express = require('express');
    const router = express.Router();

    router.get('/*', (req, res, next) => {
        res.render('domain');
    });

    router.post('/create', (req, res, next) => {
        const {name, title, description} = req.body;
        if (!validName(name) || !validTitle(title) || !validDescription(description)) {

        }
    });

    router.post('/validation/domain', (req, res, next) => {
        res.send(true);
    });

    return router;
};