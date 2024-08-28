"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ESTADO_USUARIO = void 0;
exports.SQL_ESTADO_USUARIO = {
    INACTIVAR_USUARIO: "UPDATE usuarios SET estado_usuario=2 \
      WHERE cod_usuario = $1",
    ACTIVAR_USUARIO: "UPDATE usuarios SET estado_usuario=1 \
      WHERE cod_usuario = $1",
};
