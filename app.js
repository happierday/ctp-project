"use strict";

const express = require('express');

const app = express();

const config = require('./config/config.json')[app.get('env')];

const db = require('./models');

const path = require('path');

const compression = require('compression');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index')();
const dashboard = require('./routes/dashboard')();
const signin = require('./routes/signin')();
const domain = require('./routes/domain')(db.Domain);

const session = require('express-session');
const sessionStore = require('connect-session-sequelize')(session.Store);
const sessionMiddleware = session({
    name: 'sid',
    secret: config.cookie_secret,
    saveUninitialized: false,
    resave: false,
    proxy: false,
    store: new sessionStore({
        db: db.sequelize
    }),
    cookie: {
        httpOnly: true,
        maxAge: 2592000000
    }
});

const connectEnsure = require('connect-ensure-login');

const ensureLoggedIn = connectEnsure.ensureLoggedIn('/?login');
const ensureLoggedOut = connectEnsure.ensureLoggedOut('/dashboard');

const helmet = require('helmet');

const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(config.auth0, (accessToken, refreshToken, extraParams, profile, done) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    console.log(profile);
    db.User.upsert({
        externalID: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        picture: profile.picture
    }).then(() => {
        return db.User.findOne({
            $where: {
                externalID: profile.id
            }
        });
    }).then((user) => {
        done(null, user);
    }).catch((err) => {
        logger(err);
        done(err);
    });
});

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findById(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(compression());

app.use(helmet.dnsPrefetchControl({allow: true}));
app.use(helmet.frameguard({action: 'deny'}));
// app.use(helmet.hsts({
//     maxAge: 15552000,
//     includeSubDomains: true,
//     preload: true,
//     force: true
// }));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
    directives: {
        scriptSrc: ["'self'", "'unsafe-eval'", "code.getmdl.io", "cdn.auth0.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "code.getmdl.io", "fonts.googleapis.com"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "*.googleusercontent.com", "www.gstatic.com", "cdn.auth0.com", "source.unsplash.com", "images.unsplash.com"]
    },
    reportOnly: false,
    setAllHeaders: false,
    disableAndroid: false,
    browserSniff: false
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets', 'build'), {index: false, maxAge: 15552000000}));
app.use(express.static(path.join(__dirname, 'assets', 'static'), {index: false, maxAge: 15552000000}));
app.use(sessionMiddleware);

const passportInitializeMiddleWare = passport.initialize();

const promisifiedPassportSession = ((passportSessionMiddleware) => {
    return (req, res) => {
        return new Promise((resolve, reject) => {
            passportSessionMiddleware(req, res, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    };
})(passport.session());

const getDomain = (req) => {
    if (req.path !== '/domain/edit' || !req.session.passport || !req.session.passport.user) {
        return;
    }

    return new Promise((resolve, reject) => {
        db.Domain.findOne({where: {owner: req.session.passport.user}, attributes: ['name', 'title', 'description', 'backgroundImage']}).then((domain) => {
            req.locals.domain = domain.dataValues;
            resolve();
        }).catch((err) => reject(err));
    });
};

app.use((req, res, next) => { //Make all database calls asynchronously
    if (req.subdomains.length) { //Dont initialize passport on subdomains
        next();
        return;
    }

    passportInitializeMiddleWare(req, res, (err) => {
        if (err) {
            next(err);
            return;
        }

        Promise.all([promisifiedPassportSession, getDomain].map((fn) => fn(req, res))).then(() => next()).catch((err) => next(err));
    });
});

app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.locals.user = req.user;
        res.locals.auth0 = config.auth0;
    }

    next();
});

app.use('/', index);
app.use('/dashboard', ensureLoggedIn, dashboard);
app.use('/signin', ensureLoggedOut, signin);
app.use('/domain', ensureLoggedIn, domain);
app.post('/logout', (req, res, next) => {
    if (req.user) {
        req.logout();
        res.send('OK');
    } else {
        next(401);
    }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(404);
});

const errorMessages = {
    401: '401. Unauthorized. You do not have the required permissions to access this resource.',
    404: '404. Not Found.'
};

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        if (typeof err === 'number') {
            err = {
                status: err,
                message: errorMessages[err]
            }
        }
        res.status(err.status || 500);

        if (req.method === 'GET') {
            res.render('error', {
                message: err.message,
                error: err
            });
        } else {
            res.send(err);
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    if (typeof err === 'number') {
        err = {
            status: err,
            message: errorMessages[err]
        }
    }

    res.status(err.status || 500);

    if (req.method === 'GET') {
        res.render('error', {
            message: err.message,
            error: {}
        });
    } else {
        res.send(err.message);
    }
});


module.exports = app;
