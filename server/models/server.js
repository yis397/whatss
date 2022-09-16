// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('../models/socket');
const { dbConnection } = require('../db/dbmongo');

var whitelist = ['http://localhost:4200',"https://localhost:8080",'https://chat-sapp.netlify.app','https://chat-sapp.netlify.app/chat']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        dbConnection();

        this.server =  http.createServer( this.app );
        
        this.io = socketio( this.server,{  cors: {
            origin: ["https://localhost:8080","http://localhost:4200",'https://chat-sapp.netlify.app','https://chat-sapp.netlify.app/chat'],
            methods: ["GET", "POST"]
          }}
        );
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        this.app.use( cors(corsOptions));

        
        this.app.use( express.json() );

        this.app.use( '/api/auth', require('../router/usuario') );
        this.app.use( '/api/mensajes', require('../router/mensaje') );

    }

    configurarSockets() {
        new Sockets(this.io)
    }

    execute() {

        this.middlewares();

        this.configurarSockets();

        this.server.listen( process.env.PORT||8080, () => {
            console.log('Server corriendo en puerto:' );
        });
    }

}


module.exports = Server;