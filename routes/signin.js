"use strict";

module.exports = function (User) {
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');

    router.get('/', passport.authenticate('auth0', { failureRedirect: '/' }), function(req, res) {
            res.redirect(req.session.returnTo || '/');
        });

    return router;
};