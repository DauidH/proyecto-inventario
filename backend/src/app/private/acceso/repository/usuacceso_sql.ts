export const SQL_USUARIO_ACCESO = {
    AGREGAR_INGRESO: 'INSERT INTO ingresos (cod_usuario, fecha_ingreso,hora_ingreso) \
    VALUES ($1, CURRENT_DATE, CURRENT_TIME)',

    EDITAR_ACCESO_CLAVE: 'UPDATE accesos SET correo_acceso=$1 ,clave_acceso=$2 \
    WHERE cod_usuario=$3',

    EDITAR_ACCESO: 'UPDATE accesos SET correo_acceso=$1 \
    WHERE cod_usuario=$2',

    OBTENER_ACCESO: 'SELECT a.cod_usuario, a.correo_acceso, a.clave_acceso \
    FROM accesos a \
    WHERE a.cod_usuario=$1'

}
