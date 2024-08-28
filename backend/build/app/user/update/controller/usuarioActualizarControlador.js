"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarioActualizarDao_1 = __importDefault(require("../dao/usuarioActualizarDao"));
class UsuarioActualizarControlador extends usuarioActualizarDao_1.default {
    //Para administradores que actualizan datos
    actualizarUsuarios(req, res) {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            delete req.body.codUsuario;
            const documento = req.body.documentoUsuario;
            const tipo = req.body.tipoDocumentoUsuario;
            const nombres = req.body.nombresUsuario;
            const apellidos = req.body.apellidosUsuario;
            const telefono = req.body.telefonoUsuario;
            const rol = req.body.codRol;
            const parametros = [documento, tipo, nombres, apellidos, telefono, rol, codigo];
            UsuarioActualizarControlador.editarUsuario(parametros, res);
        }
        else {
            res.status(400).json({ mensaje: "Usuario no Valido" });
        }
    }
    //Para usuarios que modifican su propio perfil
    actualizarUsuarioPerfil(req, res) {
        const codigo = Number(req.body.datosUsuario.id);
        delete req.body.codUsuario;
        const documento = req.body.documentoUsuario;
        const tipo = req.body.tipodocumentoUsuario;
        const nombres = req.body.nombresUsuario;
        const apellidos = req.body.apellidosUsuario;
        const telefono = req.body.telefonoUsuario;
        const rol = req.body.codRol;
        const parametros = [documento, tipo, nombres, apellidos, telefono, rol, codigo];
        UsuarioActualizarControlador.editarAccesos(parametros, res);
    }
    editarAccesoPerfil(req, res) {
        const codigo = req.body.codUsuario;
        const nombreAcceso = req.body.correoAcceso;
        const claveAcceso = req.body.claveAcceso;
        const parametros = [nombreAcceso, claveAcceso, codigo];
        UsuarioActualizarControlador.editarAccesos(parametros, res);
    }
}
const usuarioActualizarControlador = new UsuarioActualizarControlador();
exports.default = usuarioActualizarControlador;
