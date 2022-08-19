const jws=require('jsonwebtoken')

const setToken=(data)=>{
    return new Promise((resolve,rejects)=>{
        jws.sign(data,process.env.SECRET,{
            expiresIn: '24h'
        },(err,token)=>{
            if (err) {
                rejects('error en autenticacion')
            }else{
               resolve(token)
            }
        })
    })
}
const isUser=(token)=>{
    try {
        const {uid}=jws.verify(token,process.env.SECRET)
        

        return [true,uid]
    } catch (error) {
        return [false,null]
    }
}
module.exports={
    setToken,
    isUser
}
