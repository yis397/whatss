
const respuesta=(data,statu,resp)=>{
   return resp.status(statu).json(data)
}
module.exports=respuesta;