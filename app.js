"use strict";

const express = require('express');

const app = express();

const db = require('./models');

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const profile = require('./routes/profile')(db.User);
const signin = require('./routes/signin')(db.User);

const session = require('express-session');
const sessionStore = require('connect-session-sequelize')(session.Store);
const sessionMiddleware = session({
    name: 'sid',
    secret: 'hYemGJJsMqaDhXeLt7a91fGrIs5GOIVAK2eI6F5WpYA9Q9fqOflzVFDWpVYYxqm',
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

const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const auth0Config = require('./config/auth0.json')[app.get('env')];

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(auth0Config, (accessToken, refreshToken, extraParams, profile, done) => {
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
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets', 'build')));
app.use(express.static(path.join(__dirname, 'assets', 'static')));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.locals.user = req.user;
        res.locals.auth0 = auth0Config;
    }

    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/profile', profile);
app.use('/signin', signin);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
