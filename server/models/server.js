// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('../models/socket');
const { dbConnection } = require('../db/dbmongo');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Conectar a DB
        dbConnection();

        // Http server
        this.server =  http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server,{  cors: {
            origin: "https://localhost:8080",
            methods: ["GET", "POST"]
          }}
        );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors({ origin: true, credentials: true  }));

        
        // Parseo del body
        this.app.use( express.json() );

        // API End Points
        this.app.use( '/api/auth', require('../router/usuario') );
        this.app.use( '/api/mensajes', require('../router/mensaje') );

    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets(this.io)
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;