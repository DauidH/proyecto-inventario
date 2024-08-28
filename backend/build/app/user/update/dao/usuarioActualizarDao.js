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
const usuActualizar_sql_1 = require("../repository/usuActualizar_sql");
class UsuarioActualizarDAO {
    static editarUsuario(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .result(usuActualizar_sql_1.SQL_USUARIO_ACTUALIZAR.ACTUALIZAR, parametros)
                .then((resultado) => {
                res.status(200).json({ mensaje: "Usuario Actualizado", respusta: resultado.rowCount });
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "ERROR Update ORM" });
            });
        });
    }
    static editarAccesos(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .result(usuActualizar_sql_1.SQL_USUARIO_ACTUALIZAR.ACTUALIZAR_ACCESO, parametros)
                .then((resultado) => {
                res.status(200).json(resultado.rowCount);
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ respuesta: "ERORR Update ORM" });
            });
        });
    }
} // end class
exports.default = UsuarioActualizarDAO;
