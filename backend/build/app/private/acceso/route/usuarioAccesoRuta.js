"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioAccesoControlador_1 = __importDefault(require("../controller/usuarioAccesoControlador"));
class InformacionAccesoRutas {
    constructor() {
        this.rutaUsuAccesoAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaUsuAccesoAPI.put('/update/:cargaClave', usuarioAccesoControlador_1.default.editarAccesoPerfil);
        this.rutaUsuAccesoAPI.get('/info', usuarioAccesoControlador_1.default.obtenerAccesoPerfil);
        this.rutaUsuAccesoAPI.get('/info/:codUsuario', usuarioAccesoControlador_1.default.obtenerAccesoUsuario);
    }
}
const informacionAccesoRutas = new InformacionAccesoRutas();
exports.default = informacionAccesoRutas.rutaUsuAccesoAPI;
