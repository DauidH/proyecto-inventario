import { Response } from "express";
import pool from "../../../config/connexion/connexionDB";
import { SQL_FUNCIONALIDAD } from "../repository/funcionalidad_sql";
import FunciUsuarios from "../controller/funciUsuarios";
class FuncionalidadDAO {
  protected static codigoValido(cp: string, ct: string): boolean {
    if (cp.localeCompare(ct) == 0) {
      return true;
    }
    return false;
  }

  protected static async consultarTodas(parametros: any, res: Response): Promise<any> {
    await pool
      .result(SQL_FUNCIONALIDAD.TODAS, parametros)
      .then((respuesta) => {
        res.status(200).json(respuesta.rows);
      })
      .catch((err) => {
        res.status(400).json({ Respuesta: "Fallo al obtener los Permisos" });
      });
  }

  protected static async consultarCantidad(parametros: any, res: Response): Promise<any> {
    await pool
      .one(SQL_FUNCIONALIDAD.CANTIDAD, parametros)
      .then((respuesta) => {
        res.status(200).json(respuesta.cantidadFuncionalidad);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ Respuesta: "Fallo al consultar los Permisos" });
      });
  }

  protected static async consultarFunciUsuarios(parametros: any, res: Response): Promise<any> {
    await pool
      .result(SQL_FUNCIONALIDAD.OBTENER_FUNCIONALIDAD_USUARIO, parametros)
      .then((respuesta) => {
        res.status(200).json(respuesta.rows);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ Respuesta: "Fallo al consultar los Permisos" });
      });
  }

  protected static async permisosUsuario(sql: string, parametros: any, res: Response): Promise<any> {
    await pool
      .result(sql, parametros)
      .then((resultado) => {
        res.status(200).json(resultado.rows);
      })
      .catch((error) => {
        res.status(401).json({ Respuesta: "Fallo al obtener los Permisos" });
      });
  }

  protected static async permisosMenu(parametros: any, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const funcionalidades = await consulta.result(SQL_FUNCIONALIDAD.TODAS);
        const permisos = await consulta.result(SQL_FUNCIONALIDAD.USUARIO_MENU, parametros);
        return FunciUsuarios.permisosMenu(funcionalidades, permisos);
      })
      .then((respuesta) => {
        res.status(200).json(respuesta);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          Respuesta: "Error enviando permisos",
        });
      });
  }

  protected static async asignarPermisosUsuario(parametros: any, res: Response): Promise<any> {
    /*  console.log(parametros); */
    let ultimo = parametros.pop();

    await pool
      .task(async (consulta) => {
        const subHijos: any = await consulta.result(SQL_FUNCIONALIDAD.OBTERNER_SUB_HIJOS);
        await consulta.none(SQL_FUNCIONALIDAD.BORRAR_FUNCIONALIDAD, ultimo[1]);
        if (parametros.length > 1) {
          let codigosHijos: any[] = [];

          subHijos.rows.map((sub: any) => {
            parametros.map((param: any) => {
              if (param[0] == sub.codPadre) {
                codigosHijos.push(param[0]);
              }
            });
          });

          let todasFuncionalidades: any = await consulta.result(SQL_FUNCIONALIDAD.TODAS);

          codigosHijos.map((cod: any) => {
            todasFuncionalidades.rows.find((funci: any) => {
              if (funci.codPadre == cod) {
                parametros.push([funci.codFuncionalidad, ultimo[1]]);
              }
            });
          });

          parametros.forEach((item: any) => {
            consulta.none(SQL_FUNCIONALIDAD.CREAR_FUNCIONALIDAD, item);
          });
        }
        return await consulta.result(SQL_FUNCIONALIDAD.CREAR_FUNCIONALIDAD, ultimo);
      })
      .then((resultado) => {
        res.status(200).json({ mensaje: "Registro Actulizado", resultado: resultado });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ Respuesta: "Permisos de usuario no validos" });
      });
  }
} // end class
export default FuncionalidadDAO;
