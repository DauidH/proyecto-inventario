import { Request, Response } from "express";
import CategoriasDao from "../dao/categoriasDao";

class CategoriaController extends CategoriasDao {

  public obtenerCategoriasPaginar(req: Request, res: Response): void {
    const paginaActual = Number(req.body.paginaActual);
    const cantidadMostrar = Number(req.body.cantidadMostrar);
    const valorRegistro = (paginaActual - 1) * cantidadMostrar;
    const parametros = [cantidadMostrar, valorRegistro];
    CategoriaController.obtenerCategoriaPaginador(parametros, res);
  }

  public obtenerCategoriaBuscar(req: Request, res: Response): void {
    const parametros = [req.params.cadenaBuscar];
    CategoriaController.obtenerCategoriaBuscar(parametros, res);
  }

  public agregarCategoria(req: Request, res: Response): void {
    const nombre = req.body.nombreCategoria;
    const descripcion = req.body.descripcionCategoria;
    const estado = req.body.estadoCategoria;
    const parametros = [nombre, descripcion, estado];
    CategoriaController.crearCategoria(parametros, res);
  }

  public eliminarCategoria(req: Request, res: Response): void {
    if (!isNaN(Number(req.params.codCategoria))) {
      const codigo = Number(req.params.codCategoria);
      CategoriaController.eliminarCategoria(codigo, res);
    } else {
      res.status(400).json({ respuesta: "codigo de la categoria no valido" });
    }
  }

  public obtenerCategoria(req: Request, res: Response): void {
    const codigo = Number(req.params.codCategoria);
    CategoriaController.obtenerCategoria(codigo, res);
  }

  public actualizarCategoria(req: Request, res: Response): void {
    const codCategoria = Number(req.body.codCategoria);
    const nombreCategoria = req.body.nombreCategoria;
    const descripcionCategoria = req.body.descripcionCategoria;
    const estadoCategoria = req.body.estadoCategoria;
    const parametros = [codCategoria, nombreCategoria, descripcionCategoria, estadoCategoria];
    CategoriaController.editarCategoria(parametros, res);
  }

  public obtenerCategoriasBuscar(req: Request, res: Response): void {
    const paginaActual = Number(req.body.paginaActual);
    const cantidadMostrar = Number(req.body.cantidadMostrar);
    const valorRegistro = (paginaActual - 1) * cantidadMostrar;
    const parametros = [req.body.cadenaBuscar, cantidadMostrar, valorRegistro];
    CategoriaController.obtenerCategoriaPaginadorBuscar(parametros, res);
  }
}

const categoriaController = new CategoriaController();
export default categoriaController;
