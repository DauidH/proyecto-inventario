"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rolDao_1 = __importDefault(require("../dao/rolDao"));
class RolController extends rolDao_1.default {
    obtenerRoles(req, res) {
        RolController.obtenerRoles(req, res);
    }
    obtenerRol(req, res) {
        const codigo = Number(req.params.codRol);
        RolController.obtenerRol(codigo, res);
    }
    obtenerRolesPaginar(req, res) {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [cantidadMostrar, valorRegistro];
        RolController.obtenerRolPaginador(parametros, res);
    }
    obtenerRolesBuscar(req, res) {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [req.body.cadenaBuscar, cantidadMostrar, valorRegistro];
        RolController.obtenerRolPaginadorBuscar(parametros, res);
    }
    obtenerRolBuscar(req, res) {
        const parametros = [req.params.cadenaBuscar];
        RolController.obtenerRolBuscar(parametros, res);
    }
    agregarRol(req, res) {
        const nombre = req.body.nombreRol;
        const parametros = [nombre];
        RolController.crearRol(parametros, res);
    }
    actualizarRol(req, res) {
        const codigo = Number(req.body.codRol);
        const nombreRol = req.body.nombreRol;
        const parametros = [codigo, nombreRol];
        RolController.editarRol(parametros, res);
    }
    activarRol(req, res) {
        if (!isNaN(Number(req.params.codRol))) {
            const codigo = req.params.codRol;
            const estado = 1;
            const parametros = [codigo, estado];
            RolController.estadoRol(parametros, res);
        }
        else {
            res.status(400).json({ respuesta: "codigo de  rol no valido" });
        }
    }
    inactivarRol(req, res) {
        if (!isNaN(Number(req.params.codRol))) {
            const codigo = req.params.codRol;
            const estado = 2;
            const parametros = [codigo, estado];
            RolController.estadoRol(parametros, res);
        }
        else {
            res.status(400).json({ respuesta: "codigo de rol no valido" });
        }
    }
    eliminarRol(req, res) {
        if (!isNaN(Number(req.params.codRol))) {
            const codigo = Number(req.params.codRol);
            RolController.eliminarRol(codigo, res);
        }
        else {
            res.status(400).json({ respuesta: "codigo de rol no valido" });
        }
    }
}
const rolController = new RolController();
exports.default = rolController;
