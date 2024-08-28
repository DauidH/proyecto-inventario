"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const usuarioCrearDao_1 = __importDefault(require("../dao/usuarioCrearDao"));
class UsuarioCrearControlador extends usuarioCrearDao_1.default {
    crearUsuario(req, res) {
        const rol = req.body.codRol;
        const documento = req.body.documentoUsuario;
        const tipo = req.body.tipoDocumentoUsuario;
        const nombres = req.body.nombresUsuario;
        const apellidos = req.body.apellidosUsuario;
        const telefono = req.body.telefonoUsuario;
        const claveAcceso = "pendiente";
        const parametros = [documento, tipo, nombres, apellidos, telefono, rol, "PX_" + (0, nanoid_1.nanoid)(15), claveAcceso];
        UsuarioCrearControlador.crearUsuarios(parametros, res);
    }
}
const usuarioCrearControlador = new UsuarioCrearControlador();
exports.default = usuarioCrearControlador;
