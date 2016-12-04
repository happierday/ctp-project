"use strict";

module.exports = function (Domain) {
    const express = require('express');
    const router = express.Router();
    const request = require('request');

    router.get('/*', ({}, res, next) => {
        res.render('domain');
    });

    router.post('/create', ({user, body}, res, next) => {
        Domain.findOne({where: {owner: user.id}}).then((domain) => {
            if (domain) {
                next(400);
                return;
            }

            const {name, title, description} = body;

            request({
                url: 'http://source.unsplash.com/category/nature/1600x900',
                followRedirect: false
            }, function (err, res, body) {
                Domain.create({
                    name,
                    title,
                    description,
                    owner: user.id,
                    backgroundImage: res.headers.location ? res.headers.location : 'https://images.unsplash.com/photo-1439792924150-a1dd4adf294e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=4a52f0c079f7dc1cfe09c7357c717e37'
                })
                    .then(() => res.send(true))
                    .catch((err) => res.send(false));

            });
        });
    });

    router.post('/validation/domain', ({body}, res, next) => {
        Domain.findOne({where: {name: body.domain}}).then((domain) => {
            res.send(!domain);
        });
    });

    return router;
};