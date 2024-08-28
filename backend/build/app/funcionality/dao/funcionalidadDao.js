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
const funcionalidad_sql_1 = require("../repository/funcionalidad_sql");
const funciUsuarios_1 = __importDefault(require("../controller/funciUsuarios"));
class FuncionalidadDAO {
    static codigoValido(cp, ct) {
        if (cp.localeCompare(ct) == 0) {
            return true;
        }
        return false;
    }
    static consultarTodas(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .result(funcionalidad_sql_1.SQL_FUNCIONALIDAD.TODAS, parametros)
                .then((respuesta) => {
                res.status(200).json(respuesta.rows);
            })
                .catch((err) => {
                res.status(400).json({ Respuesta: "Fallo al obtener los Permisos" });
            });
        });
    }
    static consultarCantidad(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .one(funcionalidad_sql_1.SQL_FUNCIONALIDAD.CANTIDAD, parametros)
                .then((respuesta) => {
                res.status(200).json(respuesta.cantidadFuncionalidad);
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ Respuesta: "Fallo al consultar los Permisos" });
            });
        });
    }
    static consultarFunciUsuarios(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .result(funcionalidad_sql_1.SQL_FUNCIONALIDAD.OBTENER_FUNCIONALIDAD_USUARIO, parametros)
                .then((respuesta) => {
                res.status(200).json(respuesta.rows);
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ Respuesta: "Fallo al consultar los Permisos" });
            });
        });
    }
    static permisosUsuario(sql, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .result(sql, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((error) => {
                res.status(401).json({ Respuesta: "Fallo al obtener los Permisos" });
            });
        });
    }
    static permisosMenu(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const funcionalidades = yield consulta.result(funcionalidad_sql_1.SQL_FUNCIONALIDAD.TODAS);
                const permisos = yield consulta.result(funcionalidad_sql_1.SQL_FUNCIONALIDAD.USUARIO_MENU, parametros);
                return funciUsuarios_1.default.permisosMenu(funcionalidades, permisos);
            }))
                .then((respuesta) => {
                res.status(200).json(respuesta);
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({
                    Respuesta: "Error enviando permisos",
                });
            });
        });
    }
    static asignarPermisosUsuario(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  console.log(parametros); */
            let ultimo = parametros.pop();
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const subHijos = yield consulta.result(funcionalidad_sql_1.SQL_FUNCIONALIDAD.OBTERNER_SUB_HIJOS);
                yield consulta.none(funcionalidad_sql_1.SQL_FUNCIONALIDAD.BORRAR_FUNCIONALIDAD, ultimo[1]);
                if (parametros.length > 1) {
                    let codigosHijos = [];
                    subHijos.rows.map((sub) => {
                        parametros.map((param) => {
                            if (param[0] == sub.codPadre) {
                                codigosHijos.push(param[0]);
                            }
                        });
                    });
                    let todasFuncionalidades = yield consulta.result(funcionalidad_sql_1.SQL_FUNCIONALIDAD.TODAS);
                    codigosHijos.map((cod) => {
                        todasFuncionalidades.rows.find((funci) => {
                            if (funci.codPadre == cod) {
                                parametros.push([funci.codFuncionalidad, ultimo[1]]);
                            }
                        });
                    });
                    parametros.forEach((item) => {
                        consulta.none(funcionalidad_sql_1.SQL_FUNCIONALIDAD.CREAR_FUNCIONALIDAD, item);
                    });
                }
                return yield consulta.result(funcionalidad_sql_1.SQL_FUNCIONALIDAD.CREAR_FUNCIONALIDAD, ultimo);
            }))
                .then((resultado) => {
                res.status(200).json({ mensaje: "Registro Actulizado", resultado: resultado });
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({ Respuesta: "Permisos de usuario no validos" });
            });
        });
    }
} // end class
exports.default = FuncionalidadDAO;
