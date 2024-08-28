"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productosDao_1 = __importDefault(require("../dao/productosDao"));
class ProductoController extends productosDao_1.default {
    obtenerProductosPaginar(req, res) {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [cantidadMostrar, valorRegistro];
        ProductoController.obtenerProductosPaginador(parametros, res);
    }
}
const productoController = new ProductoController();
exports.default = productoController;
