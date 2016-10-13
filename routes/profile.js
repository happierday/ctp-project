"use strict";

module.exports = function (User) {
    let express = require('express');
    let router = express.Router();

    /* GET Public Profile */
    router.get('/', (req, res, next) => {
        User.findAll().then((users) => {
            //for(Object user in users){
            res.render('public_profile', {users:users});
        });
        //res.render('public_profile', {users:});

    });

    /* GET Shared User Content. */
    router.get('/sharedContent', (req, res, next) => {
        res.render('shared_content');
    });


    return router;
};