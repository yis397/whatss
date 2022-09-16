const { Router } = require('express');
const {check} =require ('express-validator')
const user =require ('../controllers/usuario');
const { expressValidator } =require ('../middleware/validator');
const validToken =require ('../middleware/validToken');
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
ruta.post('/addContacto',[
    check('telefono','Telefono requerido').notEmpty(),
    expressValidator,validToken
],user.addContacto)
ruta.get('/contacts',[
    validToken
],user.getListContactos)

 module.exports= ruta