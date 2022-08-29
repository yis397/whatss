const { usuarioConectado,getListContactos, mensageSend, usuarioDesconectado } = require("../controllers/socket");
const { isUser } = require("../helpers/jws");

 class Sockets {

    constructor( io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection',async (socket) => {
           console.log('cliente conectado');
           const token= socket.handshake.query['x-token'];
           const [valid,uid]=isUser(token)
           if (!valid) {
            console.log('identificaciones incorrectas');
            return socket.disconnect()
           }
            await   usuarioConectado(uid)
            socket.join(uid)
    
            this.io.to(uid).emit('contactos',await getListContactos(uid))

            socket.on('mensaje',async(data)=>{
                const mensaje=await mensageSend(data)
               
                socket.to(data.destino.toString()).emit('mensaje',mensaje)
            })

           socket.on('disconnect', async() =>{
            await usuarioDesconectado(uid)
            
            this.io.to(uid).emit('contactos',await getListContactos(uid))
           })
            
        
        });
    }


}
module.exports= Sockets