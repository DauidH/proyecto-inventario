"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioCrearControlador_1 = __importDefault(require("../add/controller/usuarioCrearControlador"));
const usuarioListarControlador_1 = __importDefault(require("../list/controller/usuarioListarControlador"));
const usuarioActualizarControlador_1 = __importDefault(require("../update/controller/usuarioActualizarControlador"));
const usuarioEliminarController_1 = __importDefault(require("../delete/controller/usuarioEliminarController"));
class UsuarioRuta {
    constructor() {
        this.apiRutaUsuario = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaUsuario.post("/paginate", usuarioListarControlador_1.default.consultarUsuariosPaginar);
        this.apiRutaUsuario.post("/search", usuarioListarControlador_1.default.consultarUsuariosBuscar);
        this.apiRutaUsuario.get("/infouser/:codUsuario", usuarioListarControlador_1.default.obtenerInformacionUsuario);
        this.apiRutaUsuario.get("/infomation", usuarioListarControlador_1.default.obtenerInfoBasicaPerfil);
        // Crear
        this.apiRutaUsuario.post("/add", usuarioCrearControlador_1.default.crearUsuario);
        // Actualizar
        this.apiRutaUsuario.put("/update/:codUsuario", usuarioActualizarControlador_1.default.actualizarUsuarios);
        this.apiRutaUsuario.put("/updateprofile/:codUsuario", usuarioActualizarControlador_1.default.actualizarUsuarioPerfil);
        // Borrar
        this.apiRutaUsuario.delete("/active/:codUsuario", usuarioEliminarController_1.default.activarUsuario);
        this.apiRutaUsuario.delete("/inactive/:codUsuario", usuarioEliminarController_1.default.inactivarUsuarios);
    }
}
const usuarioRuta = new UsuarioRuta();
exports.default = usuarioRuta.apiRutaUsuario;
