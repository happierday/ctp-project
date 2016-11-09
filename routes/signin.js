"use strict";

module.exports = function () {
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');

    router.get('/', passport.authenticate('auth0', {failureRedirect: '/'}), function (req, res) {
        var returnTo = req.session.returnTo;
        if (returnTo) {
            delete req.session.returnTo;
        }
        req.session.save(function () {
            res.redirect(returnTo || '/');
        });
    });

    return router;
};