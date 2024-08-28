export const SQL_USUARIO_LISTAR = {
    TODOS_USUARIOS:
        "SELECT u.cod_usuario ,u.documento_usuario , u.nombres_usuario , u.apellidos_usuario, \
        u.telefono_usuario , u.estado_usuario ,u.tipo_documento_usuario, \
        (SELECT a.correo_acceso from accesos a where u.cod_usuario=a.cod_usuario), r.nombre_rol \
        FROM usuarios u INNER JOIN roles r ON r.cod_rol=u.cod_rol ORDER BY (u.cod_rol)",

    TODOS_USUARIOS_PAGINAR:
        "SELECT u.cod_usuario ,u.documento_usuario , u.nombres_usuario , u.apellidos_usuario, \
        u.telefono_usuario , u.estado_usuario ,u.tipo_documento_usuario, \
        (SELECT a.correo_acceso from accesos a where u.cod_usuario=a.cod_usuario), r.nombre_rol \
        FROM usuarios u INNER JOIN roles r ON r.cod_rol=u.cod_rol ORDER BY (u.cod_rol)\
        LIMIT $1 OFFSET $2",

    TODOS_USUARIOS_BUSCAR:
        "SELECT u.cod_usuario ,u.documento_usuario , u.nombres_usuario , u.apellidos_usuario, \
        u.telefono_usuario , u.estado_usuario ,u.tipo_documento_usuario, a.correo_acceso, \
        (SELECT nombre_rol FROM roles WHERE cod_rol = u.cod_rol) as nombre_rol \
        FROM usuarios u INNER JOIN accesos a ON u.cod_usuario=a.cod_usuario INNER JOIN roles r ON r.cod_rol=u.cod_rol  \
        WHERE UNACCENT($1^) Ilike UNACCENT('%$2^%') \
        ORDER BY (u.cod_usuario) LIMIT $3 OFFSET $4",

    INFO_BASICA:
        "SELECT u.cod_usuario, u.cod_rol, u.documento_usuario, u.nombres_usuario, u.apellidos_usuario, \
        u.telefono_usuario, u.estado_usuario, u.tipo_documento_usuario, \
        (SELECT correo_acceso FROM accesos WHERE cod_usuario=u.cod_usuario), r.nombre_rol \
        FROM usuarios u INNER JOIN roles r ON r.cod_rol=u.cod_rol  \
        WHERE u.cod_usuario=$1",

    CANTIDAD_USUARIOS:
        "SELECT COUNT(u.cod_usuario) as cantidad \
        FROM usuarios u ",

    CANTIDAD_USUARIOS_BUSCAR:
        "SELECT COUNT(u.cod_usuario) as cantidad \
        FROM usuarios u INNER JOIN accesos a ON u.cod_usuario=a.cod_usuario INNER JOIN roles r ON r.cod_rol=u.cod_rol  \
        WHERE UNACCENT($1^) Ilike UNACCENT('%$2^%') ",
};