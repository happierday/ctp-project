"use strict";

module.exports = function (Domain, BlogPost, bucket) {
    const express = require('express');
    const router = express.Router();
    const request = require('request');
    const Multer = require('multer');
    const multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
            fileSize: 4 * 1024 * 1024 // no larger than 4mb for google cloud cdn support
        }
    });

    router.get('/json', (req, res, next) => {
        res.send(res.locals.domain);
    });

    router.post('/create', ({user, body}, res, next) => {
        Domain.findOne({where: {owner: user.id}}).then((domain) => {
            if (domain) {
                next(400);
                return;
            }

            const {name, title, description} = body;

            request({
                url: 'https://source.unsplash.com/category/nature/1600x900',
                followRedirect: false
            }, function (err, r, body) {
                Domain.create({
                    name,
                    title,
                    description,
                    owner: user.id,
                    backgroundImage: r.headers.location ? r.headers.location : 'https://images.unsplash.com/photo-1439792924150-a1dd4adf294e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=4a52f0c079f7dc1cfe09c7357c717e37'
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

    router.post('/edit/upload',
        (req, res, next) => {
            if (!res.locals.domain) {
                next(400);
                return;
            }

            next();
        },
        multer.single('file'),
        ({file}, res, next) => {
            if (!file) {
                next();
                return;
            }

            const domain = res.locals.domain;

            const gcsname = Date.now() + file.originalname;
            const gcsfile = bucket.file(domain.name + '/' + gcsname);

            const stream = gcsfile.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                    cacheControl: 'public, max-age=15552000',
                    contentDisposition: `attachment; filename="${file.originalname}"`
                },
                public: true,
                gzip: true,
                resumable: false
            });

            stream.on('error', (err) => {
                next(err);
            });

            stream.on('finish', () => {
                file.cloudStorageObject = gcsname;
                file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${domain.name}/${gcsname}`;
                next();
            });

            stream.end(file.buffer);
        }, ({body, file, user}, res, next) => {
            body.owner = user.id;
            body.id = Date.now() + '||' + res.locals.domain.name;
            body.url = file ? file.cloudStoragePublicUrl : null;

            console.log(body);

            BlogPost.create(body).then((blogPost) => res.send({url: body.url, id: body.id})).catch((err) => next(err));
        });

    router.get('/*', ({}, res, next) => {
        res.render('domain');
    });

    return router;
};