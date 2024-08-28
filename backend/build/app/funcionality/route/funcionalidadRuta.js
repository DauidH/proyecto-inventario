"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const funcionalidadControlador_1 = __importDefault(require("../controller/funcionalidadControlador"));
class FuncionalidadRutas {
    constructor() {
        this.rutaFuncionalidadApi = (0, express_1.Router)();
        this.configuracionRutas();
    }
    configuracionRutas() {
        this.rutaFuncionalidadApi.get('/all/:codUsuario', funcionalidadControlador_1.default.obtenerFuncUsuario);
        this.rutaFuncionalidadApi.post('/update', funcionalidadControlador_1.default.actualizarFuncUsuario);
        this.rutaFuncionalidadApi.get('/count', funcionalidadControlador_1.default.obtenerCantidadFuncionalidades);
        this.rutaFuncionalidadApi.get('/menu', funcionalidadControlador_1.default.obtenerPermisosMenu);
        this.rutaFuncionalidadApi.get('/all', funcionalidadControlador_1.default.obtenerTodas);
    }
}
const funcionalidadRutas = new FuncionalidadRutas();
exports.default = funcionalidadRutas.rutaFuncionalidadApi;
