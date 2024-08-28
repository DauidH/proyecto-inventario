import { Request, Response, NextFunction } from "express";
import pool from "../config/connexion/connexionDB";
import { SQL_PERMISO } from "../app/shared/repository/permiso_sql";
import { PERMISOS_VALIDAR } from "../config/domain/var_permisos";

class Permiso {
  public async verificarPermiso(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.headers.permission == null) {
      res.status(400).json({
        Respuesta: "Petición negada por el sistema de seguridad",
      });
    } else {
      const urlPermiso = String(req.headers.permission);
      const codUsuario = req.body.datosUsuario.id;

      const codFuncionalidad = await Permiso.consultarPermiso(urlPermiso, codUsuario);
      if (codFuncionalidad != 0) {
        if (await Permiso.validarPermiso(codUsuario, codFuncionalidad)) {
          next();
        }
      } else {
        if (PERMISOS_VALIDAR.includes(urlPermiso)) {
          next();
        } else {
          res.status(401).json({ Respuesta: "Intento de vulneracion de seguridad" });
        }
      }
    }
  }

  protected static async validarPermiso(codUsuario: number, codFuncionalidad: number): Promise<boolean> {
    const permiso = await pool.one(SQL_PERMISO.FUNCIONALIDAD_USUARIO, [codUsuario, codFuncionalidad]);
    return permiso != null;
  }

  protected static async consultarPermiso(url: string, codUsuario: number): Promise<number> {
    let encontrado = 0;
    const funcionalidades = await pool.result(SQL_PERMISO.CONSULTAR, codUsuario);

    funcionalidades.rows.map((funci: any) => {
      if (funci.urlFuncionalidad == url) {
        encontrado = funci.codFuncionalidad;
      }
    });

    if (encontrado == 0) {
      funcionalidades.rows.map((funci: any) => {
        if (funci.urlFuncionalidad.includes("{value}")) {
          const cantidad = url.split("/").length;

          const codigo = Number(url.split("/")[cantidad - 1]);

          if (funci.urlFuncionalidad.split("/{value}")[0] === url.split("/" + codigo)[0]) {
            encontrado = funci.codFuncionalidad;
          }
        }
      });
    }
    return encontrado;
  }
}
const permiso = new Permiso();
export default permiso;
