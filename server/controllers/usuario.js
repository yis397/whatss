const {response} =require ('express')
const bcrypt= require('bcryptjs')
const Usuario = require('../models/usuario')
const jws=require('../helpers/jws')

 const register=async(req,resp=response)=>{
    const {tel,username,password}=req.body
    const exist=await Usuario.findOne({tel})
    if(exist)return resp.status(400).json({ok:false,msg:'Usuario existente'})
    const salt = bcrypt.genSaltSync(5);
    const passwordhash = bcrypt.hashSync(password, salt);
    const user=await new Usuario({tel,password:passwordhash,username}).save()
    const token=await jws.setToken({tel,username,uid:user._id.toString()})

   return resp.status(200).json({
        ok:true,
        user:{tel,username},
        token   
    })
}
const login=async(req,resp=response)=>{
    const {tel,password}=req.body
    const exist=await Usuario.findOne({tel})
    if(!exist)return resp.status(400).json({ok:false,msg:'Usuario inexistente'})
    const isPassword=bcrypt.compareSync(password,exist.password)
    if(!isPassword)return resp.status(400).json({ok:false,msg:'Password invalido'})
    const token=await jws.setToken({tel,username:exist.username??"",uid:exist._id.toString()})
    return resp.status(200).json({
        ok:true,
        user:{tel,username:exist.username},
        token
    })
}
module.exports={register,login}