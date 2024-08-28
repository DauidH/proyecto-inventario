"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioAccesoDao_1 = __importDefault(require("../dao/usuarioAccesoDao"));
class UsuarioAccesoControlador extends usuarioAccesoDao_1.default {
    obtenerAccesoPerfil(req, res) {
        const parametros = [req.body.datosUsuario.id];
        UsuarioAccesoControlador.obtenerAcceso(parametros, res);
    }
    obtenerAccesoUsuario(req, res) {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            UsuarioAccesoControlador.obtenerAcceso(parametros, res);
        }
        else {
            res.status(400).json({ 'respuesta': 'Codigo de usuario no valido' });
        }
    }
    editarAccesoPerfil(req, res) {
        const codigo = req.body.codUsuario;
        const nombreAcceso = req.body.correoAcceso;
        const claveAcceso = req.body.claveAcceso;
        const cargarClave = Boolean(req.params.cargaClave);
        const cifrada = bcryptjs_1.default.hashSync(claveAcceso);
        let parametros = [];
        if (cargarClave) {
            parametros = [nombreAcceso, cifrada, codigo];
        }
        else {
            parametros = [nombreAcceso, codigo];
        }
        UsuarioAccesoControlador.editarAccesos(parametros, cargarClave, res);
    }
} //end class
const usuarioAccesoControlador = new UsuarioAccesoControlador();
exports.default = usuarioAccesoControlador;
