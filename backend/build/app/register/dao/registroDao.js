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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connexionDB_1 = __importDefault(require("../../../config/connexion/connexionDB"));
const registro_sql_1 = require("./../repository/registro_sql");
const ingreso_sql_1 = require("../../shared/repository/ingreso_sql");
const permiso_sql_1 = require("../../shared/repository/permiso_sql");
const accesoControladorVerificar_1 = __importDefault(require("../../shared/controller/accesoControladorVerificar"));
class RegistroDAO {
    static nuevoUsuario(datosUsuario, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let objeto;
                let accion = 1;
                const elCorreo = yield consulta.one(registro_sql_1.SQL_REGISTRO.CANTIDAD_CORREOS, [
                    datosUsuario.correoAcceso,
                ]);
                if (elCorreo.existe == 0) {
                    const usu = yield consulta.one(registro_sql_1.SQL_REGISTRO.REGISTRAR_USUARIO, parametros);
                    const cifrada = bcryptjs_1.default.hashSync(datosUsuario.claveAcceso);
                    yield consulta.none(registro_sql_1.SQL_REGISTRO.CREAR_ACCESO, [
                        datosUsuario.correoAcceso,
                        cifrada,
                        usu.codUsuario,
                    ]);
                    yield consulta.none(permiso_sql_1.SQL_PERMISO.CREAR_PERMISO, usu.codUsuario);
                    yield consulta.one(ingreso_sql_1.SQL_INGRESO.REGISTRAR, usu.codUsuario);
                    const info = yield consulta.result(ingreso_sql_1.SQL_INGRESO.DATOS, [
                        datosUsuario.correoAcceso,
                    ]);
                    objeto = info.rows.shift();
                    accion = 2;
                }
                return { accion, objeto };
            }))
                .then(({ accion, objeto }) => {
                switch (accion) {
                    case 1:
                        res.status(400).json({ respuesta: "Correo ya existe" });
                        break;
                    case 2:
                        const respuestaAcceso = accesoControladorVerificar_1.default.procesarRespuesta(objeto);
                        res.status(200).json(respuestaAcceso);
                        break;
                }
            })
                .catch((err) => {
                console.log(err);
                res
                    .status(400)
                    .json({ respuesta: "Error en la transacción al crear el usuario" });
            });
        });
    }
} // end class
exports.default = RegistroDAO;
