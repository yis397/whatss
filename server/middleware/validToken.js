const { response } =require ("express");
const { validationResult, } =require ("express-validator");
const {isUser} =require ("../helpers/jws");

  const validToken=(req,res=response,next)=>{
    
   const token=req.header('x-token')
   if(!token)return res.status(400).json({ok:false,msg:'error en autorizacion'})
   try {
       const uid=isUser(token)
       req.uid=uid;
       next()
    
   } catch (error) {
    return res.status(400).json({ok:false,msg:'error en autorizacion2'})
   }
}
module.exports=validToken