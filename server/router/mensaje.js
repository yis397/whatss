const { Router } = require("express");
const { check } = require("express-validator");
const { expressValidator } = require("../middleware/validator");
const validToken= require("../middleware/validToken");
const mensaje=require('../controllers/mensaje')
const ruta= Router()
ruta.post('/setMensaje',[
    check('msg','se requiere un mensaje').notEmpty(),
    check('destino','se requiere un mensaje').notEmpty(),
    expressValidator,
    validToken

],mensaje.setMensaje)
module.exports=ruta