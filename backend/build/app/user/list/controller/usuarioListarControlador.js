"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const var_opc_busc_usuarios_1 = require("../../../../config/domain/var_opc_busc_usuarios");
const usuarioListarDao_1 = __importDefault(require("../dao/usuarioListarDao"));
class UsuarioListarControlador extends usuarioListarDao_1.default {
    consultarUsuariosPaginar(req, res) {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [cantidadMostrar, valorRegistro];
        UsuarioListarControlador.informacionPaginar(parametros, res);
    }
    consultarUsuariosBuscar(req, res) {
        const columnaBuscar = var_opc_busc_usuarios_1.OPC_BUSQ_USUARIO[Number(req.body.columnaBuscar)];
        const dato = req.body.cadenaBuscar;
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [columnaBuscar, dato, cantidadMostrar, valorRegistro];
        UsuarioListarControlador.obtenerUsuarioBuscar(parametros, res);
    }
    obtenerInfoBasicaPerfil(req, res) {
        const parametros = [req.body.datosUsuario.id];
        UsuarioListarControlador.informacionBasica(parametros, res);
    }
    // Verificación permiso
    obtenerInformacionUsuario(req, res) {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            UsuarioListarControlador.informacionBasica(parametros, res);
        }
        else {
            res.status(500).json({ respuesta: "Codigo de usuario no valido" });
        }
    }
}
const usuarioListarControlador = new UsuarioListarControlador();
exports.default = usuarioListarControlador;
