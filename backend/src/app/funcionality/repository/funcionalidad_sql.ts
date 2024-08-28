export const SQL_FUNCIONALIDAD = {
  TODAS:
    "SELECT f.cod_funcionalidad, f.cod_padre, f.orden_funcionalidad, f.nombre_funcionalidad, \
    f.url_funcionalidad, f.icono_funcionalidad, f.etiqueta_funcionalidad, f.visible_funcionalidad, \
    f.target_funcionalidad, f.actividad_funcionalidad, '' as arreglo_hijos  FROM funcionalidades f \
    WHERE f.cod_funcionalidad !=1 \
    ORDER BY f.orden_funcionalidad, f.cod_funcionalidad, f.cod_padre",

  USUARIO_MENU:
    "SELECT f.cod_funcionalidad, f.cod_padre, f.orden_funcionalidad, f.nombre_funcionalidad, \
    f.url_funcionalidad, f.icono_funcionalidad, f.etiqueta_funcionalidad, f.visible_funcionalidad, \
    f.target_funcionalidad, f.actividad_funcionalidad, '' as arreglo_hijos \
    FROM funcionalidades f \
    INNER JOIN funcionalidad_usuario fu ON f.cod_funcionalidad=fu.cod_funcionalidad \
    WHERE fu.cod_usuario=$1  \
    ORDER BY f.orden_funcionalidad, f.cod_funcionalidad, f.cod_padre",

  OBTENER_FUNCIONALIDAD_USUARIO:
    "SELECT f.cod_funcionalidad, f.cod_padre, f.nombre_funcionalidad, f.url_funcionalidad \
    FROM funcionalidades f \
    INNER JOIN funcionalidad_usuario fu ON fu.cod_funcionalidad=f.cod_funcionalidad \
    WHERE fu.cod_usuario=$1",

  BORRAR_FUNCIONALIDAD:
    "DELETE FROM funcionalidad_usuario \
    WHERE cod_usuario=$1",

  CREAR_FUNCIONALIDAD:
    "INSERT INTO  funcionalidad_usuario (cod_funcionalidad,cod_usuario) \
    VALUES ($1,$2)",

  VER_PERMISO:
    "SELECT COUNT (cod_funcionalidad) AS cantidad \
    FROM funcionalidad_usuario \
    WHERE cod_usuario=$1 AND cod_funcionalidad=$2",

  VER_PERMISO_ARREGLO:
    "SELECT COUNT (cod_funcionalidad) AS cantidad \
    FROM funcionalidad_usuario \
    WHERE cod_usuario=$1 AND cod_funcionalidad IN ($2:csv)",

  CANTIDAD:
    "SELECT COUNT(f.cod_funcionalidad) as cantidad_funcionalidad \
    FROM funcionalidades f \
    INNER JOIN funcionalidad_usuario fu ON fu.cod_funcionalidad=f.cod_funcionalidad \
    WHERE fu.cod_usuario=$1",

  OBTERNER_SUB_HIJOS:
    "SELECT f.cod_funcionalidad, f.cod_padre \
   FROM funcionalidades f WHERE f.url_funcionalidad like '%{value}%'",

  OBTERNER_CODIGO:
    "SELECT f.cod_funcionalidad \
   FROM funcionalidades f WHERE f.cod_padre=$1",
};
