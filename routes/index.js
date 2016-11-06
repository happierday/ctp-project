"use strict";

module.exports = function () {
    const express = require('express');
    const router = express.Router();

    /* GET home page. */
    router.get('/', (req, res, next) => {
        // check if user is registered
        // if not registered, render 'index'
        // if registered, render 'homepage'
        res.render('index', {title: 'Plady'});
    });

    return router;
};
