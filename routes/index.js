"use strict";

module.exports = function (Domains) {
    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res, next) => {
        //res.render('index');

        Domains.findAll({
            attributes: ['name', 'title', 'description', 'backgroundImage'],
            limit: 8
        }).then(function(domains_array) {
            console.log(domains_array);
            res.render('index', {domains_array});
        })

    });


    return router;
};
