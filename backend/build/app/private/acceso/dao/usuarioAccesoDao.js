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
const usuacceso_sql_1 = require("../repository/usuacceso_sql");
class UsuarioAccesoDao {
    static obtenerAcceso(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .result(usuacceso_sql_1.SQL_USUARIO_ACCESO.OBTENER_ACCESO, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rows[0]);
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error en la transacción" });
            });
        });
    }
    static editarAccesos(parametros, conCalve, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .task((consulta) => {
                if (conCalve) {
                    return consulta.result(usuacceso_sql_1.SQL_USUARIO_ACCESO.EDITAR_ACCESO_CLAVE, parametros);
                }
                else {
                    return consulta.result(usuacceso_sql_1.SQL_USUARIO_ACCESO.EDITAR_ACCESO, parametros);
                }
            })
                .then((resultado) => {
                res.status(200).json(resultado.rowCount);
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ respuesta: "Error en la transacción" });
            });
        });
    }
}
exports.default = UsuarioAccesoDao;
