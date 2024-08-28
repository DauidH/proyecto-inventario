"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_CATEGORIAS = void 0;
exports.SQL_CATEGORIAS = {
    CANTIDAD_CATEGORIAS: "SELECT COUNT(c.cod_categoria) AS cantidad FROM categorias c",
    OBTENER_CATEGORIAS_PAGINADOR: "SELECT c.cod_categoria, c.nombre_categoria, c.descripcion_categoria, c.estado_categoria, \
     (SELECT COUNT(cod_rel_categoria_producto) FROM rel_categorias_productos WHERE cod_categoria = c.cod_categoria) AS cantidad_producto \
     FROM categorias c \
     ORDER BY c.cod_categoria ASC \
     LIMIT $1 OFFSET $2",
    CANTIDAD_CATEGORIAS_BUSCAR: "SELECT COUNT(c.cod_categoria) AS cantidad \
    FROM categorias c \
    WHERE UNACCENT(c.nombre_categoria) Ilike UNACCENT('%$1^%')",
    OBTENER_CATEGORIAS_BUSCAR: "SELECT c.cod_categoria, c.nombre_categoria, c.descripcion_categoria, c.estado_categoria, \
     (SELECT COUNT(cod_rel_categoria_producto) FROM rel_categorias_productos WHERE cod_categoria = c.cod_categoria) AS cantidad_producto \
     FROM categorias c \
     WHERE UNACCENT(c.nombre_categoria) Ilike UNACCENT('%$1^%') \
     ORDER BY c.cod_categoria ASC",
    CREAR_CATEGORIA: "INSERT INTO categorias (nombre_categoria, descripcion_categoria, estado_categoria) \
     VALUES ($1,$2,$3) RETURNING cod_categoria",
    OBTENER_CATEGORIA_VALIDO: "SELECT count(cod_categoria) AS valido \
     FROM categorias c \
     WHERE lower(c.nombre_categoria) = lower($1)",
    ELIMINAR: "DELETE FROM categorias \
     WHERE cod_categoria=$1",
    OBTENER_CATEGORIA: "SELECT c.cod_categoria, c.nombre_categoria, c.descripcion_categoria, c.estado_categoria \
     FROM categorias c \
     WHERE c.cod_categoria=$1 \
     ORDER BY c.cod_categoria ASC",
    ACTUALIZAR_CATEGORIA: "UPDATE categorias \
    SET nombre_categoria=$2, descripcion_categoria=$3, estado_categoria=$4 \
    WHERE cod_categoria=$1",
    OBTENER_CATEGORIAS_PAGINADOR_BUSCAR: "SELECT c.cod_categoria, c.nombre_categoria, c.descripcion_categoria, c.estado_categoria, \
     (SELECT COUNT(cod_rel_categoria_producto) FROM rel_categorias_productos WHERE cod_categoria = c.cod_categoria) AS cantidad_producto \
     FROM categorias c \
     WHERE UNACCENT(c.nombre_categoria) Ilike UNACCENT('%$1^%') \
     ORDER BY c.cod_categoria ASC \
     LIMIT $2 OFFSET $3",
};
