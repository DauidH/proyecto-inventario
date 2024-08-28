"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoControlador_1 = __importDefault(require("../controller/productoControlador"));
class ProductoRuta {
    constructor() {
        this.rutaProductoAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaProductoAPI.post("/paginate", productoControlador_1.default.obtenerProductosPaginar);
    }
}
const productoRuta = new ProductoRuta();
exports.default = productoRuta.rutaProductoAPI;
