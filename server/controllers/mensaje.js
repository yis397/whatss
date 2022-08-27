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
      { de: uid, para: contacto },
      { de: contacto, para: uid },
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