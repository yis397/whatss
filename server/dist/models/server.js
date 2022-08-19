"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const { dbConnection } = require('../db/dbmongo');
const Sockets = require('./socket');
class Server {
    Server() {
        this.app = express();
        this.port = process.env.PORT;
        dbConnection();
        this.server = http.createServer(this.app);
        this.socket = socketio(this.server, {});
    }
    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(this.path.resolve(__dirname, '../public')));
        // CORS
        this.app.use(cors());
        // Parseo del body
        this.app.use(express.json());
        // API End Points
        this.app.use('/api/login', require('../router/usuario'));
        // this.app.use( '/api/mensajes', require('../router/mensajes') );
    }
    configurarSockets() {
        new Sockets(this.io);
    }
    execute() {
        // Inicializar Middlewares
        this.middlewares();
        // Inicializar sockets
        this.configurarSockets();
        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map