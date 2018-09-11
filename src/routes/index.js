const router = require('express').Router();
const passport = require('passport');

//si tienes multiples rutas se utiliza antes de las rutas qu
// se quiere proteger
/*
router.use((req,res,next)=>{
    isAuthenticated(req, res, next);
    next();
});
*/

router.get('/', (req, res)=>{
    res.render('first',{page_name:""});
});
//registro
router.get('/signup', (req, res)=>{
    res.render('signup',{page_name:"signup"});
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect:'/home',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

//logueo
router.get('/signin', (req, res)=>{
    res.render('signin',{page_name:"signin"});
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect:'/home',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

//salir
router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/');
});

//validar solo una ruta
router.get('/home',isAuthenticated, (req, res)=>{
    res.render('home',{page_name:"home"});
});

//funcion de passport isAuthenticated
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

module.exports = router;