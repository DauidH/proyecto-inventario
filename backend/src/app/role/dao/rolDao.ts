import { Response } from "express";
import pool from "../../../config/connexion/connexionDB";
import { SQL_ROL } from "../repository/rol_sql";

class RolDao {
  protected static async obtenerRol(parametros: any, res: Response): Promise<any> {
    pool
      .result(SQL_ROL.OBTENER_ROL, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows[0]);
      })
      .catch((err: any) => {
        res.status(400).json({ mensaje: "Error Find ORM" });
        console.log(err);
      });
  }
  protected static async obtenerRolBuscar(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const respuestas = [];
        const cantidad = await consulta.one(SQL_ROL.CANTIDAD_ROLES_BUSCAR, parametros);
        respuestas.push(cantidad);
        const registros = await consulta.result(SQL_ROL.OBTENER_ROLES_BUSCAR, parametros);
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

  protected static async obtenerRoles(parametros: any, res: Response): Promise<any> {
    pool
      .result(SQL_ROL.OBTENER_ROLES_COMBO, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows);
      })
      .catch((err: any) => {
        res.status(400).json({ mensaje: "Error Find ORM" });
        console.log(err);
      });
  }

  protected static async obtenerRolPaginador(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const respuestas = [];
        const cantidad = await consulta.one(SQL_ROL.CANTIDAD_ROLES, parametros);
        respuestas.push(cantidad);
        const registros = await consulta.result(SQL_ROL.OBTENER_ROL_PAGINADOR, parametros);
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

  protected static async obtenerRolPaginadorBuscar(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const respuestas = [];
        const cantidad = await consulta.one(SQL_ROL.CANTIDAD_ROLES_BUSCAR, parametros);
        respuestas.push(cantidad);
        const registros = await consulta.result(SQL_ROL.OBTENER_ROLES_PAGINADOR_BUSCAR, parametros);
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

  protected static async obtenerRolEditar(parametros: any, res: Response): Promise<any> {
    pool
      .result(SQL_ROL.OBTENER_ROL, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows[0]);
      })
      .catch((err: any) => {
        res.status(400).json({ mensaje: "Fallo en la consulta" });
        console.log(err);
      });
  }

  protected static async crearRol(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const nuevoRol: any = await consulta.result(SQL_ROL.OBTENER_ROL_VALIDO, parametros);
        if (nuevoRol.rows[0].valido == 0) {
          return await consulta.result(SQL_ROL.CREAR_ROL, parametros);
        }
        return nuevoRol;
      })
      .then((resultado) => {
        if (resultado.command == "SELECT") {
          res.status(400).json({ respuesta: "El nombre del Rol" });
        } else {
          res.status(200).json({
            respuesta: "Registro Creado",
            id: resultado.rows[0].codRol,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ respuesta: "Error find ORM" });
      });
  }

  protected static async editarRol(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let validado: any = await consulta.result(SQL_ROL.OBTENER_ROL_VALIDO, parametros[1]);
        if (validado.rows[0].valido == 0) {
          return await consulta.result(SQL_ROL.ACTUALIZAR_ROL, parametros);
        }
        return validado;
      })
      .then((resultado) => {
        if (resultado.command == "SELECT") {
          res.status(400).json({ respuesta: "El nombre del Rol" });
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

  protected static async estadoRol(parametros: any, res: Response): Promise<any> {
    pool
      .task((consulta) => {
        if (parametros[1] == 1) {
          return consulta.result(SQL_ROL.ACTIVAR, parametros);
        } else {
          console.log(parametros[1]);
          return consulta.result(SQL_ROL.INACTIVAR, parametros);
        }
      })
      .then((resultado) => {
        res.status(200).json({
          mensaje: "Registro Modificado",
          resultado: resultado.rowCount,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ respuesta: "Error update state ORM" });
      });
  }
  protected static async eliminarRol(codRol: number, res: Response): Promise<any> {
    pool
      .task((consulta) => {
        return consulta.result(SQL_ROL.ELIMINAR, codRol);
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
}
export default RolDao;
