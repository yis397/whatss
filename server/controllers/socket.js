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
   if (destino.token!=='"NEL"') {

       sendNotificacion(destino.username??destino.tel,mensage.mensaje,destino.token)
   }
   return {mensage,user:{username:remitente.username,tel:remitente.tel,uid:remitente.id}}
}
const sendNotificacion=(nombre,mensaje,token)=>{
   
    
    const vapidKeys = {
        "publicKey":process.env.publicKey,
"privateKey":process.env.privateKey
    }

    const sub=JSON.parse(JSON.parse(token))
    
     webpush.setVapidDetails(
         'mailto:example@yourdomain.org',
         vapidKeys.publicKey,
         vapidKeys.privateKey
       );
  
    payload={
        "notification":{
            "title":'Mensaje nuevo de '+nombre,
            'body':mensaje,
            "vibrate":[100,50,100],
            'actions':[{
                'action':'explore',
                'title':'Go'
            }]
        }
    }
    webpush.sendNotification(
        sub,
     JSON.stringify(payload))
     .then(resp=>console.log('enviado')).catch(err=>console.log(err))
}
module.exports={
    usuarioConectado,
    getListContactos,
    mensageSend,
    usuarioDesconectado
}