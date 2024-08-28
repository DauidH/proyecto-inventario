import { Response } from "express";
import pool from "../../../config/connexion/connexionDB";
import { SQL_CATEGORIAS } from "../repository/categorias_sql";

class CategoriasDao {
  protected static async obtenerCategoriaPaginador(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const respuestas = [];

        const cantidad = await consulta.one(SQL_CATEGORIAS.CANTIDAD_CATEGORIAS, parametros);
        respuestas.push(cantidad);

        const registros = await consulta.result(SQL_CATEGORIAS.OBTENER_CATEGORIAS_PAGINADOR, parametros);
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

  protected static async obtenerCategoriaBuscar(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const respuestas = [];

        const cantidad = await consulta.one(SQL_CATEGORIAS.CANTIDAD_CATEGORIAS_BUSCAR, parametros);
        respuestas.push(cantidad);

        const registros = await consulta.result(SQL_CATEGORIAS.OBTENER_CATEGORIAS_BUSCAR, parametros);
        respuestas.push(registros.rows);

        return respuestas;
      })
      .then((resultado: any) => {
        res.status(200).json(resultado);
      })
      .catch((err: any) => {
        res.status(400).json({ mensaje: "Error Find ORM" });
        console.log(err);
      });
  }

  protected static async crearCategoria(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const nuevaCategoria: any = await consulta.result(SQL_CATEGORIAS.OBTENER_CATEGORIA_VALIDO, parametros);
        if (nuevaCategoria.rows[0].valido == 0) {
          return await consulta.result(SQL_CATEGORIAS.CREAR_CATEGORIA, parametros);
        }
        return nuevaCategoria;
      })
      .then((resultado) => {
        if (resultado.command == "SELECT") {
          res.status(400).json({ respuesta: "El nombre de la categoria ya existe" });
        } else {
          res.status(200).json({
            respuesta: "Registro Creado",
            id: resultado.rows[0].codCategoria,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ respuesta: "Error find ORM" });
      });
  }

  protected static async eliminarCategoria(codCategoria: number, res: Response): Promise<any> {
    pool
      .task((consulta) => {
        return consulta.result(SQL_CATEGORIAS.ELIMINAR, codCategoria);
      })
      .then((resultado) => {
        res.status(200).json({
          mensaje: "Registro Eliminado",
          resultado: resultado.rowCount,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ respuesta: "Error Delete state ORM" });
      });
  }

  protected static async obtenerCategoria(parametros: any, res: Response): Promise<any> {
    pool
      .result(SQL_CATEGORIAS.OBTENER_CATEGORIA, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows[0]);
      })
      .catch((err: any) => {
        res.status(400).json({ mensaje: "Error Find ORM" });
        console.log(err);
      });
  }

  protected static async editarCategoria(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let validado: any = await consulta.result(SQL_CATEGORIAS.OBTENER_CATEGORIA_VALIDO, parametros[1]);
        if (validado.rows[0].valido == 0) {
          return await consulta.result(SQL_CATEGORIAS.ACTUALIZAR_CATEGORIA, parametros);
        }
        return validado;
      })
      .then((resultado) => {
        if (resultado.command == "SELECT") {
          res.status(400).json({ respuesta: "El nombre de la categoria ya existe" });
        } else {
          res.status(200).json({
            mensaje: "Registro Modificado",
            resultado: resultado.rowCount,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ respuesta: "Error update ORM" });
      });
  }

  protected static async obtenerCategoriaPaginadorBuscar(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const respuestas = [];
        const cantidad = await consulta.one(SQL_CATEGORIAS.CANTIDAD_CATEGORIAS_BUSCAR, parametros);
        respuestas.push(cantidad);
        const registros = await consulta.result(SQL_CATEGORIAS.OBTENER_CATEGORIAS_PAGINADOR_BUSCAR, parametros);
        respuestas.push(registros.rows);
        return respuestas;
      })
      .then((resultado: any) => {
        res.status(200).json(resultado);
      })
      .catch((err: any) => {
        res.status(400).json({ mensaje: "Fallo en la consulta" });
        console.log(err);
      });
  }
}

export default CategoriasDao;
