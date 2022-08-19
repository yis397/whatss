const Usuario = require('../models/usuario');

const usuarioConectado = async( uid ) => {

    await  Usuario.findOneAndUpdate({_id:uid},{online:true})
 
}
module.exports={
    usuarioConectado
}