"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ACCESO = void 0;
exports.SQL_ACCESO = {
    EXISTE_CORREO: "SELECT a.cod_usuario, a.correo_acceso, a.clave_acceso \
    FROM accesos a \
    WHERE a.correo_acceso = $1",
    OBTENER: "SELECT a.cod_usuario, a.correo_acceso, a.clave_acceso \
    FROM accesos a \
    WHERE a.cod_usuario = $1",
};
