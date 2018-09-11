const passport = require('passport');
const passportStrategy = require('passport-local').Strategy;

const userModel = require('../models/user');


//encritpando password
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

//comparando password
passport.deserializeUser(async (id, done)=>{
    const user = await userModel.findById(id);
    done(null,user);
});

//validacion registro
passport.use('local-signup', new passportStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done) => {

    const user = await userModel.findOne({email:email});
    //console.log(validate);
    if (user) {
        done(null,false, req.flash('errorRegistro','Este email ya esta registrado'));
    } else {
        const user =  new userModel();
        user.email = email;
        user.password = user.encriptarPassword(password);
        await  user.save();
    
        done(null,user);
    }
    
}));


passport.use('local-signin', new passportStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await userModel.findOne({email:email});
    if (!user) {
        return done(null,false, req.flash('errorLogin','Usuario no encontrado'));
    } 
    if (!user.compararPassword(password)) {
        return done(null,false, req.flash('errorPass','Password incorrecto'));
    }
    done(null,user);
}));