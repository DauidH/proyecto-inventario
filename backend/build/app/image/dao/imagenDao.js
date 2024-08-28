"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imagen_sql_1 = require("../repository/imagen_sql");
const connexionDB_1 = __importDefault(require("../../../config/connexion/connexionDB"));
const imagenControladorVerificar_1 = __importDefault(require("../controller/imagenControladorVerificar"));
class ImagenDao {
    static crearImagen(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const nuevaImagen = yield consulta.one(imagen_sql_1.SQL_IMAGEN.CREAR_IMAGEN, parametros);
                yield consulta.none(imagen_sql_1.SQL_IMAGEN.ACTUALIZA_IMAGEN_FAVORITA, [nuevaImagen.codImagen]);
                return consulta.result(imagen_sql_1.SQL_IMAGEN.ACTUALIZA_IMAGEN_NO_FAVORITA, [nuevaImagen.codImagen, parametros[0]]);
            })).then(resultado => {
                res.status(200).json({ 'mensaje': 'Registro Actulizado', 'resultado': resultado.rowCount });
            }).catch(err => {
                console.log(err);
                res.status(400).json({ 'Respuesta': 'Imagen Favorita no valida' });
            });
        });
    }
    static cargarImagenes(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default.result(sql, parametros).then(resultado => {
                const arreglo = resultado.rows;
                if (arreglo.length > 0) {
                    let imagenes = imagenControladorVerificar_1.default.procesarRespuesta(arreglo);
                    res.status(200).json(imagenes);
                }
                else {
                    res.status(402).json({ 'mensaje': 'Consulta con Registros vacios' });
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ 'Mensaje': 'Fallo al obtener las Imagenes' });
            });
        });
    }
    static eliminarImagen(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const imagenFavorita = yield consulta.result(imagen_sql_1.SQL_IMAGEN.INFO_REGISTRO, parametros);
                if (imagenFavorita.rows[0].favoritaImagen != 1) {
                    return yield consulta.result(imagen_sql_1.SQL_IMAGEN.POR_CODIGO, parametros);
                }
                else {
                    yield consulta.none(imagen_sql_1.SQL_IMAGEN.POR_CODIGO, parametros);
                    const codigoNuevaFavorita = yield consulta.one(imagen_sql_1.SQL_IMAGEN.BUSCAR_UNA, imagenFavorita.rows[0].codUsuario);
                    yield consulta.none(imagen_sql_1.SQL_IMAGEN.ACTUALIZA_IMAGEN_FAVORITA, [imagenFavorita.rows[0].codUsuario, codigoNuevaFavorita.codImagen]);
                    return yield consulta.result(imagen_sql_1.SQL_IMAGEN.ACTUALIZA_IMAGEN_NO_FAVORITA, [imagenFavorita.rows[0].codUsuario, codigoNuevaFavorita.codImagen]);
                }
            })).then(resultado => {
                res.status(200).json({ 'mensaje': 'registro e imagen eliminada', 'respuesta': resultado.rowCount });
            }).catch(error => {
                console.log(error);
                res.status(400).json({ 'respuesta': 'Imagen no eliminada' });
            });
        });
    }
    static imagenFavorita(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                yield consulta.none(imagen_sql_1.SQL_IMAGEN.ACTUALIZA_IMAGEN_FAVORITA, parametros);
                return consulta.result(imagen_sql_1.SQL_IMAGEN.ACTUALIZA_IMAGEN_NO_FAVORITA, parametros);
            })).then(resultado => {
                res.status(200).json({ 'mensaje': 'Registro Actulizado', 'resultado': resultado.rowCount });
            }).catch(error => {
                console.log(error);
                res.status(500).json({ 'Respuesta': 'Imagen Favorita no valida' });
            });
        });
    }
}
exports.default = ImagenDao;
