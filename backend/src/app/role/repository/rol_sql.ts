export const SQL_ROL = {
  CANTIDAD_ROLES:
    "SELECT COUNT(r.cod_rol) as cantidad \
    FROM roles r",

  CANTIDAD_ROLES_BUSCAR:
    "SELECT COUNT(r.cod_rol) as cantidad \
    FROM roles r \
    WHERE  UNACCENT(r.nombre_rol) Ilike UNACCENT('%$1^%')",

  OBTENER_ROL_PAGINADOR:
    "SELECT r.cod_rol , r.nombre_rol , r.estado_rol, \
    (select count(u.cod_rol) from usuarios u where u.cod_rol = r.cod_rol) AS cantidad_usuarios \
    FROM roles r \
    ORDER BY r.cod_rol ASC \
    LIMIT $1 OFFSET $2",

  OBTENER_ROLES_BUSCAR:
    "SELECT r.cod_rol , r.nombre_rol , r.estado_rol, \
    (select count(u.cod_rol) from usuarios u where u.cod_rol = r.cod_rol) AS cantidad_usuarios \
    FROM roles r \
    WHERE  UNACCENT(r.nombre_rol) Ilike UNACCENT('%$1^%') \
    ORDER BY r.cod_rol ASC",

  OBTENER_ROL:
    "SELECT r.cod_rol , r.nombre_rol , r.estado_rol, \
      (select count(u.cod_rol) from usuarios u where u.cod_rol = r.cod_rol) AS cantidad_usuarios \
      FROM roles r \
      WHERE r.cod_rol=$1 \
      ORDER BY r.cod_rol ASC",

  OBTENER_ROLES_PAGINADOR_BUSCAR:
    "SELECT r.cod_rol , r.nombre_rol , r.estado_rol, \
    (select count(u.cod_rol) from usuarios u where u.cod_rol = r.cod_rol) AS cantidad_usuarios \
    FROM roles r \
    WHERE  UNACCENT(r.nombre_rol) Ilike UNACCENT('%$1^%') \
    ORDER BY r.cod_rol ASC \
    LIMIT $2 OFFSET $3",

  OBTENER_ROLES_COMBO:
    "SELECT r.cod_rol, r.nombre_rol \
    FROM roles r \
    WHERE r.estado_rol = 1 \
    ORDER BY r.cod_rol ASC",

  OBTENER_ROL_VALIDO:
    "SELECT count(cod_rol) AS valido \
    FROM roles r \
    WHERE lower(r.nombre_rol)= lower($1)",

  CREAR_ROL: "INSERT  INTO roles (nombre_rol,estado_rol) VALUES ($1,1) RETURNING cod_rol",

  ACTUALIZAR_ROL:
    "UPDATE roles SET nombre_rol=$2 \
    WHERE cod_rol=$1",

  INACTIVAR:
    "UPDATE roles SET estado_rol=2 \
    WHERE cod_rol=$1",

  ACTIVAR:
    "UPDATE roles SET estado_rol=1 \
    WHERE cod_rol=$1",

  ELIMINAR:
    "DELETE FROM roles \
    WHERE cod_rol=$1",
};
