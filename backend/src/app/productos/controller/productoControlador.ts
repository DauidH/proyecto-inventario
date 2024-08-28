import { Request, Response } from "express";
import ProductosDao from "../dao/productosDao";

class ProductoController extends ProductosDao {
  public obtenerProductosPaginar(req: Request, res: Response): void {
    const paginaActual = Number(req.body.paginaActual);
    const cantidadMostrar = Number(req.body.cantidadMostrar);
    const valorRegistro = (paginaActual - 1) * cantidadMostrar;
    const parametros = [cantidadMostrar, valorRegistro];
    ProductoController.obtenerProductosPaginador(parametros, res);
  }
}

const productoController = new ProductoController();
export default productoController;
