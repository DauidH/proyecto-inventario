export const SQL_INGRESO = {
  DATOS:
    "SELECT a.cod_usuario, \
        (SELECT nombre_privado_imagen FROM imagenes WHERE favorita_imagen= 1 AND  \
        cod_usuario = a.cod_usuario limit 1) as nombre_privado_imagen, \
        (SELECT nombre_rol FROM roles WHERE cod_rol IN ( \
        SELECT cod_rol FROM usuarios WHERE cod_usuario = a.cod_usuario)), \
        u.nombres_usuario, u.apellidos_usuario, a.correo_acceso, u.cod_rol \
        FROM accesos a INNER JOIN usuarios u on a.cod_usuario = u.cod_usuario \
        WHERE a.correo_acceso = $1 AND u.estado_usuario = 1",

  REGISTRAR:
    "INSERT INTO ingresos (cod_usuario, fecha_ingreso, hora_ingreso) \
        VALUES ($1, CURRENT_DATE, CURRENT_TIME) RETURNING cod_usuario",
};
