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
const connexionDB_1 = __importDefault(require("../../../config/connexion/connexionDB"));
const categorias_sql_1 = require("../repository/categorias_sql");
class CategoriasDao {
    static obtenerCategoriaPaginador(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(categorias_sql_1.SQL_CATEGORIAS.CANTIDAD_CATEGORIAS, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(categorias_sql_1.SQL_CATEGORIAS.OBTENER_CATEGORIAS_PAGINADOR, parametros);
                respuestas.push(registros.rows);
                return respuestas;
            }))
                .then((resultado) => {
                res.status(200).json(resultado);
            })
                .catch((err) => {
                res.status(400).json({ mensaje: "Fallo la consulta en el backend" });
                console.log(err);
            });
        });
    }
    static obtenerCategoriaBuscar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(categorias_sql_1.SQL_CATEGORIAS.CANTIDAD_CATEGORIAS_BUSCAR, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(categorias_sql_1.SQL_CATEGORIAS.OBTENER_CATEGORIAS_BUSCAR, parametros);
                respuestas.push(registros.rows);
                return respuestas;
            }))
                .then((resultado) => {
                res.status(200).json(resultado);
            })
                .catch((err) => {
                res.status(400).json({ mensaje: "Error Find ORM" });
                console.log(err);
            });
        });
    }
    static crearCategoria(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const nuevaCategoria = yield consulta.result(categorias_sql_1.SQL_CATEGORIAS.OBTENER_CATEGORIA_VALIDO, parametros);
                if (nuevaCategoria.rows[0].valido == 0) {
                    return yield consulta.result(categorias_sql_1.SQL_CATEGORIAS.CREAR_CATEGORIA, parametros);
                }
                return nuevaCategoria;
            }))
                .then((resultado) => {
                if (resultado.command == "SELECT") {
                    res.status(400).json({ respuesta: "El nombre de la categoria ya existe" });
                }
                else {
                    res.status(200).json({
                        respuesta: "Registro Creado",
                        id: resultado.rows[0].codCategoria,
                    });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error find ORM" });
            });
        });
    }
    static eliminarCategoria(codCategoria, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .task((consulta) => {
                return consulta.result(categorias_sql_1.SQL_CATEGORIAS.ELIMINAR, codCategoria);
            })
                .then((resultado) => {
                res.status(200).json({
                    mensaje: "Registro Eliminado",
                    resultado: resultado.rowCount,
                });
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error Delete state ORM" });
            });
        });
    }
    static obtenerCategoria(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .result(categorias_sql_1.SQL_CATEGORIAS.OBTENER_CATEGORIA, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows[0]);
            })
                .catch((err) => {
                res.status(400).json({ mensaje: "Error Find ORM" });
                console.log(err);
            });
        });
    }
    static editarCategoria(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let validado = yield consulta.result(categorias_sql_1.SQL_CATEGORIAS.OBTENER_CATEGORIA_VALIDO, parametros[1]);
                if (validado.rows[0].valido == 0) {
                    return yield consulta.result(categorias_sql_1.SQL_CATEGORIAS.ACTUALIZAR_CATEGORIA, parametros);
                }
                return validado;
            }))
                .then((resultado) => {
                if (resultado.command == "SELECT") {
                    res.status(400).json({ respuesta: "El nombre de la categoria ya existe" });
                }
                else {
                    res.status(200).json({
                        mensaje: "Registro Modificado",
                        resultado: resultado.rowCount,
                    });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error update ORM" });
            });
        });
    }
    static obtenerCategoriaPaginadorBuscar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(categorias_sql_1.SQL_CATEGORIAS.CANTIDAD_CATEGORIAS_BUSCAR, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(categorias_sql_1.SQL_CATEGORIAS.OBTENER_CATEGORIAS_PAGINADOR_BUSCAR, parametros);
                respuestas.push(registros.rows);
                return respuestas;
            }))
                .then((resultado) => {
                res.status(200).json(resultado);
            })
                .catch((err) => {
                res.status(400).json({ mensaje: "Fallo en la consulta" });
                console.log(err);
            });
        });
    }
}
exports.default = CategoriasDao;
