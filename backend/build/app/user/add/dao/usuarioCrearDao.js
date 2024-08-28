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
const usuCrear_sql_1 = require("../repository/usuCrear_sql");
const connexionDB_1 = __importDefault(require("../../../../config/connexion/connexionDB"));
const permiso_sql_1 = require("../../../shared/repository/permiso_sql");
class UsuarioCrearDAO {
    static crearUsuarios(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const nuevoUsuario = yield consulta.one(usuCrear_sql_1.SQL_USUARIO_CREAR.USUARIO, parametros);
                parametros.push(nuevoUsuario.codUsuario);
                yield consulta.none(usuCrear_sql_1.SQL_USUARIO_CREAR.ACCESO, parametros);
                yield consulta.none(permiso_sql_1.SQL_PERMISO.CREAR_PERMISO, nuevoUsuario.codUsuario);
                return nuevoUsuario.codUsuario;
            }))
                .then((resultado) => {
                res.status(200).json({ codUsuario: resultado });
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error Create ORM" });
            });
        });
    }
} // end class
exports.default = UsuarioCrearDAO;
