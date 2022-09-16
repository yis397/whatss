const Mensage = require('../models/mensage');
const Usuario = require('../models/usuario');
const webpush=require('web-push')


  
const usuarioConectado = async( uid ) => {

    await  Usuario.findOneAndUpdate({_id:uid},{online:true})
 
}

const usuarioDesconectado = async( uid ) => {

    await  Usuario.findOneAndUpdate({_id:uid},{online:false})
 
}
const getListContactos = async( uid ) => {

   const user= await  Usuario.findOne({_id:uid})
   const lista=await Usuario.find({_id:{$in:user.contactos},online:true})
   
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
   sendNotificacion(remitente.username??remitente.tel,remitente.token??'nop')
   if (remitente.token) {
       sendNotificacion(remitente.username??remitente.tel,remitente.token)
   }
   return {mensage,user:{username:remitente.username,tel:remitente.tel,uid:remitente.id}}
}
const sendNotificacion=(nombre,token)=>{
    console.log(process.env.publicKey);
    console.log(token);
    /* 
    const vapidKeys = webpush.generateVAPIDKeys();
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
  
    payload={
        'notification':{
        title:'Nuevo mensaje de '+nombre,
        vibrate:[100,50,100],
        actions:[{action:'explore'}]
        }
    }
    webpush.sendNotification(
     JSON.parse(token),
     JSON.stringify(payload))
     .then(resp=>console.log('enviado')).catch(err=>console.log('error push')) */
}
module.exports={
    usuarioConectado,
    getListContactos,
    mensageSend,
    usuarioDesconectado
}