import { Request, Response } from "express";
import RolDao from "../dao/rolDao";

class RolController extends RolDao {
  public obtenerRoles(req: Request, res: Response): void {
    RolController.obtenerRoles(req, res);
  }

  public obtenerRol(req: Request, res: Response): void {
    const codigo = Number(req.params.codRol);
    RolController.obtenerRol(codigo, res);
  }

  public obtenerRolesPaginar(req: Request, res: Response): void {
    const paginaActual = Number(req.body.paginaActual);
    const cantidadMostrar = Number(req.body.cantidadMostrar);
    const valorRegistro = (paginaActual - 1) * cantidadMostrar;
    const parametros = [cantidadMostrar, valorRegistro];
    RolController.obtenerRolPaginador(parametros, res);
  }

  public obtenerRolesBuscar(req: Request, res: Response): void {
    const paginaActual = Number(req.body.paginaActual);
    const cantidadMostrar = Number(req.body.cantidadMostrar);
    const valorRegistro = (paginaActual - 1) * cantidadMostrar;
    const parametros = [req.body.cadenaBuscar, cantidadMostrar, valorRegistro];
    RolController.obtenerRolPaginadorBuscar(parametros, res);
  }

  public obtenerRolBuscar(req: Request, res: Response): void {
    const parametros = [req.params.cadenaBuscar];
    RolController.obtenerRolBuscar(parametros, res);
  }

  public agregarRol(req: Request, res: Response): void {
    const nombre = req.body.nombreRol;
    const parametros = [nombre];
    RolController.crearRol(parametros, res);
  }

  public actualizarRol(req: Request, res: Response): void {
    const codigo = Number(req.body.codRol);
    const nombreRol = req.body.nombreRol;
    const parametros = [codigo, nombreRol];
    RolController.editarRol(parametros, res);
  }

  public activarRol(req: Request, res: Response): void {
    if (!isNaN(Number(req.params.codRol))) {
      const codigo = req.params.codRol;
      const estado = 1;
      const parametros = [codigo, estado];
      RolController.estadoRol(parametros, res);
    } else {
      res.status(400).json({ respuesta: "codigo de  rol no valido" });
    }
  }

  public inactivarRol(req: Request, res: Response): void {
    if (!isNaN(Number(req.params.codRol))) {
      const codigo = req.params.codRol;
      const estado = 2;
      const parametros = [codigo, estado];
      RolController.estadoRol(parametros, res);
    } else {
      res.status(400).json({ respuesta: "codigo de rol no valido" });
    }
  }
  public eliminarRol(req: Request, res: Response): void {
    if (!isNaN(Number(req.params.codRol))) {
      const codigo = Number(req.params.codRol);
      RolController.eliminarRol(codigo, res);
    } else {
      res.status(400).json({ respuesta: "codigo de rol no valido" });
    }
  }
}

const rolController = new RolController();
export default rolController;
