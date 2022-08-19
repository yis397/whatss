const { response } = require("express");

const setMensaje=(req,res=response)=>{
  const uid=req.uid
  
  return res.status(200).json({
    ok:true,
    msg:uid
  })
}
module.exports={
    setMensaje
}