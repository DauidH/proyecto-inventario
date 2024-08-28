export const SQL_PERMISO = {
  CREAR_PERMISO:
    "INSERT INTO  funcionalidad_usuario (cod_funcionalidad,cod_usuario) \
  VALUES (1,$1)",

  CONSULTAR:
    "SELECT f.cod_funcionalidad, f.cod_padre, f.orden_funcionalidad, f.nombre_funcionalidad, \
  f.url_funcionalidad, f.icono_funcionalidad, f.etiqueta_funcionalidad, f.visible_funcionalidad, \
  f.target_funcionalidad, f.actividad_funcionalidad, '' as arreglo_hijos \
  FROM funcionalidades f \
  INNER JOIN funcionalidad_usuario fu ON f.cod_funcionalidad=fu.cod_funcionalidad \
  WHERE fu.cod_usuario=$1 \
  ORDER BY f.orden_funcionalidad, f.cod_funcionalidad, f.cod_padre",

  FUNCIONALIDAD_USUARIO:
    "SELECT cod_usuario \
  FROM funcionalidad_usuario WHERE cod_usuario=$1 AND cod_funcionalidad=$2",
};
