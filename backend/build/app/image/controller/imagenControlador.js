"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const imagenDao_1 = __importDefault(require("../dao/imagenDao"));
const imagen_sql_1 = require("../repository/imagen_sql");
const var_imagenes_1 = __importDefault(require("../../../config/domain/var_imagenes"));
const administrarImagen_1 = __importDefault(require("../../../config/utilities/administrarImagen"));
class ImagenControlador extends imagenDao_1.default {
    obtenerImagenesUsuario(req, res) {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            ImagenControlador.cargarImagenes(imagen_sql_1.SQL_IMAGEN.OBTENER_IMAGENES, codigo, res);
        }
        else {
            res.status(500).json({ 'mensaje': 'codigo usuario no valido' });
        }
    }
    crearFoto(req, res) {
        delete req.body.datosUsuario;
        delete req.body.codImagen;
        const tipo = req.body.tipoImagen;
        const codigo = req.body.codUsuario;
        const tamano = req.body.tamanioImagen;
        const nombre = req.body.nombrePublicoImagen;
        const nombrePrivado = codigo + '_' + (0, nanoid_1.nanoid)(10) + '.' + tipo.split('/')[1];
        const rutaImagenSistema = var_imagenes_1.default.rutaFotosUsuarios;
        administrarImagen_1.default.crearImagen(nombrePrivado, req.body.base64Imagen, rutaImagenSistema);
        const parametros = [codigo, nombre, nombrePrivado, tipo, tamano];
        ImagenControlador.crearImagen(parametros, res);
    }
    eliminarImagen(req, res) {
        const parametros = Number([req.params.codImagen]);
        const rutaImagenSistema = var_imagenes_1.default.fotoDefecto;
        administrarImagen_1.default.borrarImagen(req.body.nombreprivadoImagen, rutaImagenSistema);
        ImagenControlador.eliminarImagen(parametros, res);
    }
    imagenFavorita(req, res) {
        if (!isNaN(Number(req.params.codImagen)) && !isNaN(Number(req.params.codUsuario))) {
            const codigoImagen = Number(req.params.codImagen);
            const codigoUsuario = Number(req.params.codUsuario);
            const parametros = [codigoImagen, codigoUsuario];
            ImagenControlador.imagenFavorita(parametros, res);
        }
        else {
            res.status(400).json({ 'mensaje': 'Codigo no valido' });
        }
    }
}
const imagenControlador = new ImagenControlador();
exports.default = imagenControlador;
