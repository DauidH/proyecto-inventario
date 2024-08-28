"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriasDao_1 = __importDefault(require("../dao/categoriasDao"));
class CategoriaController extends categoriasDao_1.default {
    obtenerCategoriasPaginar(req, res) {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [cantidadMostrar, valorRegistro];
        CategoriaController.obtenerCategoriaPaginador(parametros, res);
    }
    obtenerCategoriaBuscar(req, res) {
        const parametros = [req.params.cadenaBuscar];
        CategoriaController.obtenerCategoriaBuscar(parametros, res);
    }
    agregarCategoria(req, res) {
        const nombre = req.body.nombreCategoria;
        const descripcion = req.body.descripcionCategoria;
        const estado = req.body.estadoCategoria;
        const parametros = [nombre, descripcion, estado];
        CategoriaController.crearCategoria(parametros, res);
    }
    eliminarCategoria(req, res) {
        if (!isNaN(Number(req.params.codCategoria))) {
            const codigo = Number(req.params.codCategoria);
            CategoriaController.eliminarCategoria(codigo, res);
        }
        else {
            res.status(400).json({ respuesta: "codigo de la categoria no valido" });
        }
    }
    obtenerCategoria(req, res) {
        const codigo = Number(req.params.codCategoria);
        CategoriaController.obtenerCategoria(codigo, res);
    }
    actualizarCategoria(req, res) {
        const codCategoria = Number(req.body.codCategoria);
        const nombreCategoria = req.body.nombreCategoria;
        const descripcionCategoria = req.body.descripcionCategoria;
        const estadoCategoria = req.body.estadoCategoria;
        const parametros = [codCategoria, nombreCategoria, descripcionCategoria, estadoCategoria];
        CategoriaController.editarCategoria(parametros, res);
    }
    obtenerCategoriasBuscar(req, res) {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [req.body.cadenaBuscar, cantidadMostrar, valorRegistro];
        CategoriaController.obtenerCategoriaPaginadorBuscar(parametros, res);
    }
}
const categoriaController = new CategoriaController();
exports.default = categoriaController;
