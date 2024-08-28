import cifrar from "bcryptjs";
import { Response } from "express";
import pool from "../../../config/connexion/connexionDB";

import Usuario from "../entities/usuario";
import { SQL_REGISTRO } from "./../repository/registro_sql";

import { SQL_INGRESO } from "../../shared/repository/ingreso_sql";
import { SQL_PERMISO } from "../../shared/repository/permiso_sql";
import RespuestaAcceso from "../../shared/entities/respuestaAcceso";
import AccesoControladorVerificar from "../../shared/controller/accesoControladorVerificar";

class RegistroDAO {
  protected static async nuevoUsuario(
    datosUsuario: Usuario,
    parametros: string[],
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let objeto: any;
        let accion: number = 1;
        const elCorreo = await consulta.one(SQL_REGISTRO.CANTIDAD_CORREOS, [
          datosUsuario.correoAcceso,
        ]);

        if (elCorreo.existe == 0) {
          const usu = await consulta.one(
            SQL_REGISTRO.REGISTRAR_USUARIO,
            parametros
          );
          const cifrada = cifrar.hashSync(datosUsuario.claveAcceso as string);

          await consulta.none(SQL_REGISTRO.CREAR_ACCESO, [
            datosUsuario.correoAcceso,
            cifrada,
            usu.codUsuario,
          ]);
          await consulta.none(SQL_PERMISO.CREAR_PERMISO, usu.codUsuario);
          await consulta.one(SQL_INGRESO.REGISTRAR, usu.codUsuario);

          const info = await consulta.result(SQL_INGRESO.DATOS, [
            datosUsuario.correoAcceso,
          ]);
          objeto = info.rows.shift();
          accion = 2;
        }
        return { accion, objeto };
      })
      .then(({ accion, objeto }) => {
        switch (accion) {
          case 1:
            res.status(400).json({ respuesta: "Correo ya existe" });
            break;
          case 2:
            const respuestaAcceso: RespuestaAcceso =
              AccesoControladorVerificar.procesarRespuesta(objeto);
            res.status(200).json(respuestaAcceso);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ respuesta: "Error en la transacción al crear el usuario" });
      });
  }
} // end class
export default RegistroDAO;
