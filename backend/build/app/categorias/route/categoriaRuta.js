"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaControlador_1 = __importDefault(require("../controller/categoriaControlador"));
class CategoriaRuta {
    constructor() {
        this.rutaCategoriaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaCategoriaAPI.post("/add", categoriaControlador_1.default.agregarCategoria);
        this.rutaCategoriaAPI.post("/paginate", categoriaControlador_1.default.obtenerCategoriasPaginar);
        this.rutaCategoriaAPI.post("/search", categoriaControlador_1.default.obtenerCategoriasBuscar);
        this.rutaCategoriaAPI.get("/one/:codCategoria", categoriaControlador_1.default.obtenerCategoria);
        this.rutaCategoriaAPI.get("/search/:cadenaBuscar", categoriaControlador_1.default.obtenerCategoriaBuscar);
        this.rutaCategoriaAPI.put("/update", categoriaControlador_1.default.actualizarCategoria);
        this.rutaCategoriaAPI.delete("/delete/:codCategoria", categoriaControlador_1.default.eliminarCategoria);
    }
}
const categoriaRuta = new CategoriaRuta();
exports.default = categoriaRuta.rutaCategoriaAPI;
