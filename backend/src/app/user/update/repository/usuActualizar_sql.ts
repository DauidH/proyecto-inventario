export const SQL_USUARIO_ACTUALIZAR = {
    ACTUALIZAR:
        "UPDATE usuarios SET documento_usuario = $1, tipo_documento_usuario=$2, nombres_usuario=$3, \
      apellidos_usuario=$4, telefono_usuario=$5, cod_rol=$6 where cod_usuario = $7",

    ACTUALIZAR_ACCESO:
        "UPDATE accesos SET correo_acceso=$1 ,clave_acceso=$2 \
      WHERE cod_usuario=$3",
};