import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class Seguridad {
  public verificarToken(req: Request, res: Response, next: NextFunction): any {
    if (!req.headers.authorization) {
      res.status(401).json({
        Respuesta: "Petición negada por el sistema de seguridad",
      });
    } else {
      try {
        const token = req.headers.authorization?.split(" ")[1] as string;
        const datos = jwt.verify(token, "claveSuperSecreta");

        req.body.datosUsuario = datos;

        next();
      } catch (error) {
        res.status(401).json({
          Respuesta: "Intento de fraude",
        });
      }
    }
  }
}
const seguridad = new Seguridad();
export default seguridad;
