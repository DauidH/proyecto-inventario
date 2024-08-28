import cifrar from "bcryptjs";
import { Response } from "express";
import pool from "../../../config/connexion/connexionDB";

import Acceso from "../entities/acceso";
import { SQL_ACCESO } from "../repository/acceso_sql";

import { SQL_INGRESO } from "../../shared/repository/ingreso_sql";
import RespuestaAcceso from "../../shared/entities/respuestaAcceso";
import AccesoControladorVerificar from "../../shared/controller/accesoControladorVerificar";

class AccesoDao {
  protected static async iniciarSesion(res: Response, objAcceso: Acceso): Promise<any> {
    pool
      .task(async (consulta) => {
        let correcto = false;
        let info: any = await consulta.result(SQL_ACCESO.EXISTE_CORREO, [objAcceso.correoAcceso]);
        let objeto = info.rows;

        if (objeto.length != 0) {
          objeto = objeto.shift();
          const claveCorrecta = cifrar.compareSync(objAcceso.claveAcceso, objeto.claveAcceso);
          if (claveCorrecta) {
            info = await consulta.result(SQL_INGRESO.DATOS, [objAcceso.correoAcceso]);
            objeto = info.rows.shift();
            await consulta.one(SQL_INGRESO.REGISTRAR, objeto.codUsuario);
            correcto = true;
          }
        }
        return { correcto, objeto };
      })
      .then(({ correcto, objeto }) => {
        if (correcto) {
          const resAcceso: RespuestaAcceso = AccesoControladorVerificar.procesarRespuesta(objeto);
          res.status(200).json(resAcceso);
        } else {
          res.status(400).json({ respuesta: "Credenciales incorrectas" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ respuesta: "Error en el sistema de autenticación" });
      });
  }
}
export default AccesoDao;
