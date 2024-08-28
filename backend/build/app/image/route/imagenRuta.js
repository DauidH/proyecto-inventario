"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagenControlador_1 = __importDefault(require("../controller/imagenControlador"));
class ImagenRuta {
    constructor() {
        this.apiRutaImagen = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.apiRutaImagen.post('/add', imagenControlador_1.default.crearFoto);
        this.apiRutaImagen.get('/all/:codUsuario', imagenControlador_1.default.obtenerImagenesUsuario);
        this.apiRutaImagen.get('/favorite/:codImagen/:codUsuario', imagenControlador_1.default.imagenFavorita);
        this.apiRutaImagen.delete('/delete/:codImagen', imagenControlador_1.default.eliminarImagen);
    }
}
const imagenRuta = new ImagenRuta();
exports.default = imagenRuta.apiRutaImagen;
