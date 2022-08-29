const { response } = require("express");
const Mensaje = require("../models/mensage");

const setMensaje=(req,res=response)=>{
  const uid=req.uid
  
  return res.status(200).json({
    ok:true,
    msg:uid
  })
}
const getMensage=async(req,res=response)=>{
  const uid=req.uid
  const contacto=req.params.id
  const mensajes=await Mensaje.find({
    $or: [
      { destino: uid[1], remitente: contacto },
      { destino: contacto, remitente: uid[1] },
  ]
  }) .sort({ createdAt: 'asc' })
  .limit(30);

  return res.status(200).json({
    ok:true,
    mensajes,
  })
}
module.exports={
    setMensaje,
    getMensage
}