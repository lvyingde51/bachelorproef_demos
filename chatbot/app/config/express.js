var express = require('express'),
    session = require('express-session'),
    compression = require('compression'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    winston = require('winston'),
    helpers = require('view-helpers'),
    expressValidator = require('express-validator'),
    pkg = require('../../package.json'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

var env = process.env.NODE_ENV || 'development';
module.exports = function (app) {

    app.set('showStackError', true);

    // should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        treshold: 512
    }));
    //
    // if(env !== 'production') {
    //     if(config.coverageDirectory) {
    //         fs.exists(config.coverageDirectory, function(exists) {
    //             if(!exists) {
    //                 mkdirp.sync(config.coverageDirectory);
    //             }
    //
    //             // Serve the documentation files if we are not running in production
    //             app.use('/coverage', serveStatic(config.coverageDirectory));
    //         });
    //     }
    // }

    // Logging
    // Use winston on production
    var log;
    var format = 'combined';
    if(env !== 'development') {
        log = {
            stream: {
                write: function(message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        format = 'dev';
        log = {};
    }
    // Don't log during tests
    if(env !== 'test') app.use(morgan(format, log));

    // set views path, template engine and default layout
    // app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    // expose package.json to views
    app.use(function(req, res, next) {
        res.locals.pkg = pkg;
        next();
    });

    // cookieParser should be above session
    // bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(bodyParser.json());
    // expressValidator must be immediately after bodyparser
    app.use(expressValidator());
    app.use(methodOverride());

    // app.use(session({
    //     resave: true,
    //     saveUninitialized: true,
    //     secret: pkg.name,
    //     store: new mongoStore({
    //         url: config.db,
    //         collection: 'sessions'
    //     })
    // }));
    //
    // app.use(flash());
    //
    // // should be declared after session and flash
    // app.use(helpers(pkg.name));
};
