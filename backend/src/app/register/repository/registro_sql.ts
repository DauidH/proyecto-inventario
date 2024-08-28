export const SQL_REGISTRO = {
  CANTIDAD_CORREOS:
      "SELECT COUNT (cod_usuario) as existe FROM accesos \
      WHERE correo_acceso = $1",

  REGISTRAR_USUARIO:
      "INSERT INTO usuarios (documento_usuario, tipo_documento_usuario, nombres_usuario, \
      apellidos_usuario, telefono_usuario, cod_rol, estado_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7) \
      RETURNING cod_usuario",

  CREAR_ACCESO:
      "INSERT INTO accesos (correo_acceso, clave_acceso, cod_usuario) \
      VALUES ($1, $2, $3)",

  CREAR_PERMISO:
      "INSERT INTO  funcionalidad_usuario (cod_funcionalidad,cod_usuario) \
  VALUES (1,$1)"
};