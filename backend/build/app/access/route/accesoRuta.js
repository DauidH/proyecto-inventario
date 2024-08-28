"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accesoControlador_1 = __importDefault(require("../controller/accesoControlador"));
class AccesoRuta {
    constructor() {
        this.apiRutaAcceso = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaAcceso.post("/check", accesoControlador_1.default.verificarSesion);
    }
}
const accesoRuta = new AccesoRuta();
exports.default = accesoRuta.apiRutaAcceso;
