export const SQL_IMAGEN = {
    OBTENER_IMAGENES: 'SELECT  i.cod_imagen ,i.nombre_publico_imagen , i.nombre_privado_imagen, \
    i.cod_usuario , i.favorita_imagen \
    FROM imagenes i \
    WHERE i.cod_usuario=$1  ORDER BY (i.cod_imagen)',

    CREAR_IMAGEN: 'INSERT INTO imagenes (cod_usuario,nombre_publico_imagen,nombre_privado_imagen, tipo_imagen, \
    tamanio_imagen,favorita_imagen) \
    VALUES ($1,$2,$3,$4,$5,2) RETURNING cod_imagen',

    ACTUALIZA_IMAGEN_FAVORITA: 'UPDATE imagenes SET favorita_imagen=1 \
    WHERE cod_imagen=$1 ',

    ACTUALIZA_IMAGEN_NO_FAVORITA: 'UPDATE imagenes SET favorita_imagen=2 \
    WHERE cod_imagen !=$1 AND cod_usuario=$2',

    INFO_REGISTRO: 'SELECT i.favorita_imagen,i.cod_usuario FROM imagenes i WHERE i.cod_imagen=$1',

    POR_CODIGO: 'DELETE FROM imagenes i WHERE i.cod_imagen=$1',

    BUSCAR_UNA: 'SELECT  i.cod_imagen FROM  imagenes i \
    WHERE i.cod_usuario=$1 ORDER BY i.cod_imagen desc LIMIT 1',

}
