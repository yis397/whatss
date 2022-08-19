const { response } =require ("express");
const { validationResult, } =require ("express-validator");

  const expressValidator=(req,res=response,next)=>{
    
 const error=validationResult(req)
 if (!error.isEmpty()) {
    return res.status(400).json({
        ok:false,
        msg:error.errors[0].msg
    })
 }
 next()
}
module.exports={expressValidator}