"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarioEliminarDao_1 = __importDefault(require("../dao/usuarioEliminarDao"));
class UsuarioEliminarControlador extends usuarioEliminarDao_1.default {
    inactivarUsuarios(req, res) {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            const inactivo = 2;
            UsuarioEliminarControlador.cambiarEstado(inactivo, parametros, res);
        }
        else {
            res.status(400).json({ mensaje: "Usuario no valido" });
        }
    }
    activarUsuario(req, res) {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            const activo = 1;
            UsuarioEliminarControlador.cambiarEstado(activo, parametros, res);
        }
        else {
            res.status(400).json({ mensaje: "Usuario no valido" });
        }
    }
}
const usuarioEliminarControlador = new UsuarioEliminarControlador();
exports.default = usuarioEliminarControlador;
