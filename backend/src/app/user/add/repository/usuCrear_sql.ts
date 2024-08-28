export const SQL_USUARIO_CREAR = {
    USUARIO:
        "INSERT INTO usuarios (documento_usuario, tipo_documento_usuario, nombres_usuario, apellidos_usuario, \
      telefono_usuario, cod_rol, estado_usuario) \
      VALUES ($1,$2,$3,$4,$5,$6,1) RETURNING cod_usuario",

    ACCESO:
        "INSERT INTO accesos (correo_acceso, clave_acceso, cod_usuario) \
      VALUES ($7,$8,$9)",
};