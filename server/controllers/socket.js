const Mensage = require('../models/mensage');
const Usuario = require('../models/usuario');

const usuarioConectado = async( uid ) => {

    await  Usuario.findOneAndUpdate({_id:uid},{online:true})
 
}
const usuarioDesconectado = async( uid ) => {

    await  Usuario.findOneAndUpdate({_id:uid},{online:false})
 
}
const getListContactos = async( uid ) => {

   const user= await  Usuario.findOne({_id:uid})
   const lista=await Usuario.find({_id:{$in:user.contactos}})
   return lista
}
const mensageSend=async(data)=>{
   const mensage=new Mensage(data);
   await mensage.save()
   return mensage
}
module.exports={
    usuarioConectado,
    getListContactos,
    mensageSend,
    usuarioDesconectado
}