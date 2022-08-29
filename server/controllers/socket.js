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
   const destino=await Usuario.findOne({_id:data.destino})
   const remitente=await Usuario.findOne({_id:data.remitente})
   const existContacto=destino.contactos.find(e=>e.toString()===data.remitente)
   if (!existContacto) {
    await Usuario.updateOne({_id:data.destino},{$push:{contactos:data.remitente}})
   }
 
   const mensage=new Mensage(data);
   await mensage.save()
   return {mensage,user:{username:remitente.username,tel:remitente.tel,uid:remitente.id}}
}
module.exports={
    usuarioConectado,
    getListContactos,
    mensageSend,
    usuarioDesconectado
}