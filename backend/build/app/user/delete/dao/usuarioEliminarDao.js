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
const usuEstado_sql_1 = require("../repository/usuEstado_sql");
const connexionDB_1 = __importDefault(require("../../../../config/connexion/connexionDB"));
class UsuarioEliminarDAO {
    static cambiarEstado(estado, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => {
                if (estado == 1) {
                    return consulta.result(usuEstado_sql_1.SQL_ESTADO_USUARIO.ACTIVAR_USUARIO, parametros);
                }
                else {
                    return consulta.result(usuEstado_sql_1.SQL_ESTADO_USUARIO.INACTIVAR_USUARIO, parametros);
                }
            })
                .then((resultado) => {
                res.status(200).json({ mensaje: " Exitó cambio de estado", respusta: resultado.rowCount });
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "ERROR update ORM" });
            });
        });
    }
} // end class
exports.default = UsuarioEliminarDAO;
