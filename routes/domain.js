"use strict";

module.exports = function (Domain) {
    const express = require('express');
    const router = express.Router();

    router.get('/*', (req, res, next) => {
        res.render('domain');
    });

    router.post('/create', (req, res, next) => {
        const {name, title, description} = req.body;

        Domain.findOrCreate({where: {name}, defaults: {title, description, owner: req.user.id}}).spread((domain, created) => {
            res.send(created);
        });
    });

    router.post('/validation/domain', (req, res, next) => {
        Domain.findOne({where: {name: req.body.domain}}).then((domain) => {
            res.send(!domain);
        });
    });

    return router;
};