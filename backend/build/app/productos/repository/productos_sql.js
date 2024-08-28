"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_PRODUCTOS = void 0;
exports.SQL_PRODUCTOS = {
    CANTIDAD_PRODUCTOS: "SELECT COUNT(p.cod_producto) AS cantidad FROM productos p",
    OBTENER_PRODUCTOS_PAGINADOR: "SELECT p.cod_producto, p.referencia_producto, p.nombre_producto, p.descripcion_producto, \
     p.precio_venta_producto, p.estado_producto, \
     (SELECT nombre_categoria FROM categorias WHERE cod_categoria = \
     (SELECT cod_categoria FROM rel_categorias_productos WHERE cod_producto=p.cod_producto)) AS nombre_categoria \
     FROM productos p \
     ORDER BY p.cod_producto ASC \
     LIMIT $1 OFFSET $2",
};
