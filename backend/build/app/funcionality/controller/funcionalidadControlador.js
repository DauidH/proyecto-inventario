"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const funcionalidadDao_1 = __importDefault(require("../dao/funcionalidadDao"));
class FuncionalidadControlador extends funcionalidadDao_1.default {
    obtenerFuncUsuario(req, res) {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            FuncionalidadControlador.consultarFunciUsuarios(parametros, res);
        }
        else {
            res.status(400).json({ mensaje: "Problema de seguridad 401b" });
        }
    }
    obtenerCantidadFuncionalidades(req, res) {
        if (!isNaN(Number(req.body.datosUsuario.id))) {
            const codigo = Number(req.body.datosUsuario.id);
            FuncionalidadControlador.consultarCantidad(codigo, res);
        }
        else {
            res.status(400).json({ mensaje: "Error codigo de usuario no valido" });
        }
    }
    obtenerTodas(req, res) {
        FuncionalidadControlador.consultarTodas(req, res);
    }
    obtenerPermisosMenu(req, res) {
        if (!isNaN(Number(req.body.datosUsuario.id))) {
            const codigo = Number(req.body.datosUsuario.id);
            FuncionalidadControlador.permisosMenu(codigo, res);
        }
        else {
            res.status(400).json({ mensaje: "Error codigo de usuario no valido" });
        }
    }
    actualizarFuncUsuario(req, res) {
        let parametros;
        parametros = [];
        req.body.forEach((item) => {
            parametros.push([item.codFuncionalidad, item.codUsuario]);
        });
        /*  console.log(parametros);
            res.status(200).json({mensaje:'Algo'}); */
        FuncionalidadControlador.asignarPermisosUsuario(parametros, res);
    }
}
const funcionalidadControlador = new FuncionalidadControlador();
exports.default = funcionalidadControlador;
