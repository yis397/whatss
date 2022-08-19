const { Router } = require('express');
const {check} =require ('express-validator')
const user =require ('../controllers/usuario');
const { expressValidator } =require ('../middleware/validator');
 const ruta=Router();
 ruta.post('/register',[
    check('tel','Telefono requerido').notEmpty(),
    check('username'),
    check('password','Se necesita password').notEmpty(),
    expressValidator
],user.register )
ruta.post('/login',[
    check('tel','Telefono requerido').notEmpty(),
    check('password','Se necesita password').notEmpty(),
    expressValidator
],user.login)

 module.exports= ruta