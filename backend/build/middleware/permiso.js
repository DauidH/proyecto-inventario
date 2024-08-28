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
const connexionDB_1 = __importDefault(require("../config/connexion/connexionDB"));
const permiso_sql_1 = require("../app/shared/repository/permiso_sql");
const var_permisos_1 = require("../config/domain/var_permisos");
class Permiso {
    verificarPermiso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.headers.permission == null) {
                res.status(400).json({
                    Respuesta: "Petición negada por el sistema de seguridad",
                });
            }
            else {
                const urlPermiso = String(req.headers.permission);
                const codUsuario = req.body.datosUsuario.id;
                const codFuncionalidad = yield Permiso.consultarPermiso(urlPermiso, codUsuario);
                if (codFuncionalidad != 0) {
                    if (yield Permiso.validarPermiso(codUsuario, codFuncionalidad)) {
                        next();
                    }
                }
                else {
                    if (var_permisos_1.PERMISOS_VALIDAR.includes(urlPermiso)) {
                        next();
                    }
                    else {
                        res.status(401).json({ Respuesta: "Intento de vulneracion de seguridad" });
                    }
                }
            }
        });
    }
    static validarPermiso(codUsuario, codFuncionalidad) {
        return __awaiter(this, void 0, void 0, function* () {
            const permiso = yield connexionDB_1.default.one(permiso_sql_1.SQL_PERMISO.FUNCIONALIDAD_USUARIO, [codUsuario, codFuncionalidad]);
            return permiso != null;
        });
    }
    static consultarPermiso(url, codUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let encontrado = 0;
            const funcionalidades = yield connexionDB_1.default.result(permiso_sql_1.SQL_PERMISO.CONSULTAR, codUsuario);
            funcionalidades.rows.map((funci) => {
                if (funci.urlFuncionalidad == url) {
                    encontrado = funci.codFuncionalidad;
                }
            });
            if (encontrado == 0) {
                funcionalidades.rows.map((funci) => {
                    if (funci.urlFuncionalidad.includes("{value}")) {
                        const cantidad = url.split("/").length;
                        const codigo = Number(url.split("/")[cantidad - 1]);
                        if (funci.urlFuncionalidad.split("/{value}")[0] === url.split("/" + codigo)[0]) {
                            encontrado = funci.codFuncionalidad;
                        }
                    }
                });
            }
            return encontrado;
        });
    }
}
const permiso = new Permiso();
exports.default = permiso;
