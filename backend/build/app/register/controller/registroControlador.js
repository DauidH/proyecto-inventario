"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registroDao_1 = __importDefault(require("../dao/registroDao"));
const paramUsuario_1 = __importDefault(require("../controller/paramUsuario"));
class RegistroControlador extends registroDao_1.default {
    crearUsuario(req, res) {
        const { nuevoUsuario, arregloNuevoUsuario } = paramUsuario_1.default.armar(req);
        RegistroControlador.nuevoUsuario(nuevoUsuario, arregloNuevoUsuario, res);
    }
}
const registroControlador = new RegistroControlador();
exports.default = registroControlador;
