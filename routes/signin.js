"use strict";

module.exports = function (User) {
    const express = require('express');
    const router = express.Router();
    const request = require('request');

//login page
    router.get('/', (req, res, next) => {
        res.render('signin');
    });

//send token to google and retrieve information
    router.post('/', (req, res, next) => {
        const {token} = req.body;
        if (token === undefined) {
            res.status(400).send('Missing token.');
            return
        }

        request.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`, (err, reqRes, body) => {
            if (err !== undefined || reqRes.statusCode !== 200) {
                console.log(err || body);
                res.status(500).send('Failed token authentication.');
                return;
            }


            if (req.body.aud !== '348845630253-kcfnm3nkki0tkmlruejqtjd4914cnutf.apps.googleusercontent.com') {
                res.status(400).send('Invalid token.');
                return;
            }

            //Upsert into database and create session cookie
            console.log(body);
        });
    });

    return router;
};