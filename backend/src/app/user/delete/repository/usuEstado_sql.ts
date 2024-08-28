export const SQL_ESTADO_USUARIO = {
    INACTIVAR_USUARIO:
        "UPDATE usuarios SET estado_usuario=2 \
      WHERE cod_usuario = $1",

    ACTIVAR_USUARIO:
        "UPDATE usuarios SET estado_usuario=1 \
      WHERE cod_usuario = $1",
};