import { Request, Response } from "express";

import FuncionalidadDAO from "../dao/funcionalidadDao";

class FuncionalidadControlador extends FuncionalidadDAO {
  public obtenerFuncUsuario(req: Request, res: Response): void {
    if (!isNaN(Number(req.params.codUsuario))) {
      const codigo = Number(req.params.codUsuario);
      const parametros = [codigo];
      FuncionalidadControlador.consultarFunciUsuarios(parametros, res);
    } else {
      res.status(400).json({ mensaje: "Problema de seguridad 401b" });
    }
  }

  public obtenerCantidadFuncionalidades(req: Request, res: Response): void {
    if (!isNaN(Number(req.body.datosUsuario.id))) {
      const codigo = Number(req.body.datosUsuario.id);
      FuncionalidadControlador.consultarCantidad(codigo, res);
    } else {
      res.status(400).json({ mensaje: "Error codigo de usuario no valido" });
    }
  }

  public obtenerTodas(req: Request, res: Response): void {
    FuncionalidadControlador.consultarTodas(req, res);
  }

  public obtenerPermisosMenu(req: Request, res: Response): void {
    if (!isNaN(Number(req.body.datosUsuario.id))) {
      const codigo = Number(req.body.datosUsuario.id);
      FuncionalidadControlador.permisosMenu(codigo, res);
    } else {
      res.status(400).json({ mensaje: "Error codigo de usuario no valido" });
    }
  }

  public actualizarFuncUsuario(req: Request, res: Response): void {
    let parametros: Array<any>;
    parametros = [];
    req.body.forEach((item: any) => {
      parametros.push([item.codFuncionalidad, item.codUsuario]);
    });
    /*  console.log(parametros);
        res.status(200).json({mensaje:'Algo'}); */

    FuncionalidadControlador.asignarPermisosUsuario(parametros, res);
  }
}

const funcionalidadControlador = new FuncionalidadControlador();
export default funcionalidadControlador;
