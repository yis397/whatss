"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const usuario_1 = require("../controllers/usuario");
const validator_1 = require("../middleware/validator");
const rutaUsuario = express_1.default.Router();
rutaUsuario.get('/register', [
    (0, express_validator_1.check)('username', 'username obligatorio').notEmpty(),
    (0, express_validator_1.check)('tel', 'tel obligatorio').notEmpty(),
    validator_1.expressValidator
], usuario_1.register);
exports.default = rutaUsuario;
//# sourceMappingURL=usuario.js.map