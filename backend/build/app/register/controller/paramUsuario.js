"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const usuario_1 = __importDefault(require("../entities/usuario"));
class ParamUsuario {
    static armar(req) {
        const documento = "DOC_" + (0, nanoid_1.nanoid)(15);
        const nuevoUsuario = new usuario_1.default();
        nuevoUsuario.documentoUsuario = documento;
        nuevoUsuario.tipoDocumentoUsuario = "PD";
        nuevoUsuario.nombresUsuario = req.body.nombresUsuario;
        nuevoUsuario.apellidosUsuario = req.body.apellidosUsuario;
        nuevoUsuario.telefonoUsuario = "No disponible";
        nuevoUsuario.codRol = 2;
        nuevoUsuario.estadoUsuario = 1;
        nuevoUsuario.correoAcceso = req.body.correoAcceso;
        nuevoUsuario.claveAcceso = req.body.claveAcceso;
        const arregloNuevoUsuario = [
            nuevoUsuario.documentoUsuario,
            nuevoUsuario.tipoDocumentoUsuario,
            nuevoUsuario.nombresUsuario,
            nuevoUsuario.apellidosUsuario,
            nuevoUsuario.telefonoUsuario,
            nuevoUsuario.codRol,
            nuevoUsuario.estadoUsuario,
            nuevoUsuario.correoAcceso,
            nuevoUsuario.claveAcceso,
        ];
        return { nuevoUsuario, arregloNuevoUsuario };
    }
}
exports.default = ParamUsuario;
