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
    const user=await new Usuario({tel,password:passwordhash,username:username.toLowerCase()}).save()
    const token=await jws.setToken({tel,username:username.toLowerCase(),uid:user._id.toString()})

   return resp.status(200).json({
        ok:true,
        user:{tel,username,uid:user._id.toString()},
        token   
    })
}
const login=async(req,resp=response)=>{
    const {tel,password}=req.body
    const exist=await Usuario.findOne({tel})
    if(!exist)return resp.status(400).json({ok:false,msg:'Usuario inexistente'})
    const isPassword=bcrypt.compareSync(password,exist.password)
    if(!isPassword)return resp.status(400).json({ok:false,msg:'Password invalido'})
    const user={tel,username:exist.username.toLowerCase()??"",uid:exist._id.toString()}
    const token=await jws.setToken(user)
    return resp.status(200).json({
        ok:true,
        user,
        token
    })
}
const addContacto=async(req,resp=respons)=>{
    const uid=req.uid;
    const {telefono}=req.body;
    const exist=await Usuario.findOne({tel:telefono})
    if (!exist)return resp.status(400).json({ok:false,msg:'Usuario inexistente'})
    await Usuario.updateOne({_id:uid[1]},{$push:{contactos:exist.id}})
    return resp.status(200).json({
        ok:true,
        user:exist,
    })
}
module.exports={register,login,addContacto}