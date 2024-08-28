import { Response } from "express";
import pool from "../../../../config/connexion/connexionDB";
import { SQL_USUARIO_ACCESO } from "../repository/usuacceso_sql";
class UsuarioAccesoDao {
  protected static async obtenerAcceso(parametros: any, res: Response): Promise<any> {
    pool
      .result(SQL_USUARIO_ACCESO.OBTENER_ACCESO, parametros)
      .then((resultado: any) => {
        res.status(200).json(resultado.rows[0]);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(400).json({ respuesta: "Error en la transacción" });
      });
  }

  protected static async editarAccesos(parametros: any, conCalve: boolean, res: Response): Promise<any> {
    pool
      .task((consulta) => {
        if (conCalve) {
          return consulta.result(SQL_USUARIO_ACCESO.EDITAR_ACCESO_CLAVE, parametros);
        } else {
          return consulta.result(SQL_USUARIO_ACCESO.EDITAR_ACCESO, parametros);
        }
      })
      .then((resultado: any) => {
        res.status(200).json(resultado.rowCount);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json({ respuesta: "Error en la transacción" });
      });
  }
}

export default UsuarioAccesoDao;
