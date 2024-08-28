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
const rol_sql_1 = require("../repository/rol_sql");
class RolDao {
    static obtenerRol(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .result(rol_sql_1.SQL_ROL.OBTENER_ROL, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows[0]);
            })
                .catch((err) => {
                res.status(400).json({ mensaje: "Error Find ORM" });
                console.log(err);
            });
        });
    }
    static obtenerRolBuscar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(rol_sql_1.SQL_ROL.CANTIDAD_ROLES_BUSCAR, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(rol_sql_1.SQL_ROL.OBTENER_ROLES_BUSCAR, parametros);
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
    static obtenerRoles(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .result(rol_sql_1.SQL_ROL.OBTENER_ROLES_COMBO, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((err) => {
                res.status(400).json({ mensaje: "Error Find ORM" });
                console.log(err);
            });
        });
    }
    static obtenerRolPaginador(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(rol_sql_1.SQL_ROL.CANTIDAD_ROLES, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(rol_sql_1.SQL_ROL.OBTENER_ROL_PAGINADOR, parametros);
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
    static obtenerRolPaginadorBuscar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(rol_sql_1.SQL_ROL.CANTIDAD_ROLES_BUSCAR, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(rol_sql_1.SQL_ROL.OBTENER_ROLES_PAGINADOR_BUSCAR, parametros);
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
    static obtenerRolEditar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .result(rol_sql_1.SQL_ROL.OBTENER_ROL, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows[0]);
            })
                .catch((err) => {
                res.status(400).json({ mensaje: "Fallo en la consulta" });
                console.log(err);
            });
        });
    }
    static crearRol(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const nuevoRol = yield consulta.result(rol_sql_1.SQL_ROL.OBTENER_ROL_VALIDO, parametros);
                if (nuevoRol.rows[0].valido == 0) {
                    return yield consulta.result(rol_sql_1.SQL_ROL.CREAR_ROL, parametros);
                }
                return nuevoRol;
            }))
                .then((resultado) => {
                if (resultado.command == "SELECT") {
                    res.status(400).json({ respuesta: "El nombre del Rol" });
                }
                else {
                    res.status(200).json({
                        respuesta: "Registro Creado",
                        id: resultado.rows[0].codRol,
                    });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error find ORM" });
            });
        });
    }
    static editarRol(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let validado = yield consulta.result(rol_sql_1.SQL_ROL.OBTENER_ROL_VALIDO, parametros[1]);
                if (validado.rows[0].valido == 0) {
                    return yield consulta.result(rol_sql_1.SQL_ROL.ACTUALIZAR_ROL, parametros);
                }
                return validado;
            }))
                .then((resultado) => {
                if (resultado.command == "SELECT") {
                    res.status(400).json({ respuesta: "El nombre del Rol" });
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
    static estadoRol(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .task((consulta) => {
                if (parametros[1] == 1) {
                    return consulta.result(rol_sql_1.SQL_ROL.ACTIVAR, parametros);
                }
                else {
                    console.log(parametros[1]);
                    return consulta.result(rol_sql_1.SQL_ROL.INACTIVAR, parametros);
                }
            })
                .then((resultado) => {
                res.status(200).json({
                    mensaje: "Registro Modificado",
                    resultado: resultado.rowCount,
                });
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error update state ORM" });
            });
        });
    }
    static eliminarRol(codRol, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .task((consulta) => {
                return consulta.result(rol_sql_1.SQL_ROL.ELIMINAR, codRol);
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
}
exports.default = RolDao;
