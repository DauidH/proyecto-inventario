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
const connexionDB_1 = __importDefault(require("../../../../config/connexion/connexionDB"));
const usuListar_sql_1 = require("../repository/usuListar_sql");
class UsuarioListarDAO {
    static informacionBasica(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .result(usuListar_sql_1.SQL_USUARIO_LISTAR.INFO_BASICA, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows[0]);
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ Respuesta: "Error find to ORM" });
            });
        });
    }
    static informacionPaginar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(usuListar_sql_1.SQL_USUARIO_LISTAR.CANTIDAD_USUARIOS, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(usuListar_sql_1.SQL_USUARIO_LISTAR.TODOS_USUARIOS_PAGINAR, parametros);
                respuestas.push(registros.rows);
                return respuestas;
            }))
                .then((resultado) => {
                res.status(200).json(resultado);
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ Respuesta: "Error Find ORM" });
            });
        });
    }
    static obtenerUsuarioBuscar(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(usuListar_sql_1.SQL_USUARIO_LISTAR.CANTIDAD_USUARIOS_BUSCAR, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(usuListar_sql_1.SQL_USUARIO_LISTAR.TODOS_USUARIOS_BUSCAR, parametros);
                respuestas.push(registros.rows);
                return respuestas;
            }))
                .then((resultado) => {
                res.status(200).json(resultado);
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ Respuesta: "Error Find ORM" });
            });
        });
    }
}
exports.default = UsuarioListarDAO;
