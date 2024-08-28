import { Response } from "express";
import pool from "../../../config/connexion/connexionDB";
import { SQL_PRODUCTOS } from "../repository/productos_sql";

class ProductosDao {
  protected static async obtenerProductosPaginador(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const respuestas = [];

        const cantidad = await consulta.one(SQL_PRODUCTOS.CANTIDAD_PRODUCTOS, parametros);
        respuestas.push(cantidad);

        const registros = await consulta.result(SQL_PRODUCTOS.OBTENER_PRODUCTOS_PAGINADOR, parametros);
        respuestas.push(registros.rows);
        return respuestas;
      })
      .then((resultado: any) => {
        res.status(200).json(resultado);
      })
      .catch((err: any) => {
        res.status(400).json({ mensaje: "Fallo la consulta en el backend" });
        console.log(err);
      });
  }
}

export default ProductosDao;
