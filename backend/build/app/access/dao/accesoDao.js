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
const acceso_sql_1 = require("../repository/acceso_sql");
const ingreso_sql_1 = require("../../shared/repository/ingreso_sql");
const accesoControladorVerificar_1 = __importDefault(require("../../shared/controller/accesoControladorVerificar"));
class AccesoDao {
    static iniciarSesion(res, objAcceso) {
        return __awaiter(this, void 0, void 0, function* () {
            connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let correcto = false;
                let info = yield consulta.result(acceso_sql_1.SQL_ACCESO.EXISTE_CORREO, [objAcceso.correoAcceso]);
                let objeto = info.rows;
                if (objeto.length != 0) {
                    objeto = objeto.shift();
                    const claveCorrecta = bcryptjs_1.default.compareSync(objAcceso.claveAcceso, objeto.claveAcceso);
                    if (claveCorrecta) {
                        info = yield consulta.result(ingreso_sql_1.SQL_INGRESO.DATOS, [objAcceso.correoAcceso]);
                        objeto = info.rows.shift();
                        yield consulta.one(ingreso_sql_1.SQL_INGRESO.REGISTRAR, objeto.codUsuario);
                        correcto = true;
                    }
                }
                return { correcto, objeto };
            }))
                .then(({ correcto, objeto }) => {
                if (correcto) {
                    const resAcceso = accesoControladorVerificar_1.default.procesarRespuesta(objeto);
                    res.status(200).json(resAcceso);
                }
                else {
                    res.status(400).json({ respuesta: "Credenciales incorrectas" });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error en el sistema de autenticación" });
            });
        });
    }
}
exports.default = AccesoDao;
