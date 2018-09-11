const express = require('express');
const morgan  = require('morgan');
const engine  = require('ejs-mate');
const passport= require('passport');
const session = require('express-session');
const flash   = require('connect-flash');

require('./dbconfig');
require('./passport/local-auth');

const app = express();

//configure
app.use(morgan('dev'));
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname +'/public'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: '&%&%DSADAS12312121@@',
    resave:false,
    saveUninitialized:false,
    cookie: {
        path:'/',
        maxAge: 60000 }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    app.locals.errorRegistro = req.flash('errorRegistro');
    app.locals.errorLogin    = req.flash('errorLogin');
    app.locals.errorPass     = req.flash('errorPass');
    app.locals.user = req.user;
    next();
});

// imports routes
const loginRoute = require('./routes/index');
// use routes
app.use(loginRoute);


app.listen(app.get('port'),()=>{
    console.log('se levanto el servidor '+app.get('port'));
});