const { usuarioConectado } = require("../controllers/socket");
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
           const token= socket.handshake.query.token;
           const [valid,uid]=isUser(token)
           if (!valid) {
            console.log('identificaciones incorrectas');
            return socket.disconnect()
           }
            await   usuarioConectado(uid)
            socket.join(uid)

           socket.on('disconnect', () =>{
            console.log('cliente desconectado');
           })
            
        
        });
    }


}
module.exports= Sockets