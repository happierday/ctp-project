"use strict";

module.exports = function (Domain) {
    const express = require('express');
    const router = express.Router();

    router.get('/*', ({}, res, next) => {
        res.render('domain');
    });

    router.post('/create', ({user, body}, res, next) => {
        console.log(user.id);
        Domain.findOne({where: {owner: user.id}}).then((domain) => {
            if (domain) {
                next(400);
                return;
            }

            const {name, title, description} = body;

            Domain.create({
                name,
                title,
                description,
                owner: user.id
            })
                .then(() => res.send(true))
                .catch((err) => res.send(false));
        });
    });

    router.post('/validation/domain', ({body}, res, next) => {
        Domain.findOne({where: {name: body.domain}}).then((domain) => {
            res.send(!domain);
        });
    });

    return router;
};