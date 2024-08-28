"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registroControlador_1 = __importDefault(require("../controller/registroControlador"));
class RegistroRuta {
    constructor() {
        this.apiRutaRegistro = (0, express_1.Router)();
        this.cargarRutas();
    }
    cargarRutas() {
        this.apiRutaRegistro.post("/user", registroControlador_1.default.crearUsuario);
    }
}
const accesoRuta = new RegistroRuta();
exports.default = accesoRuta.apiRutaRegistro;
