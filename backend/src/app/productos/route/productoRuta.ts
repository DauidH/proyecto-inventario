import { Router } from "express";
import productoController from "../controller/productoControlador";

class ProductoRuta {
  public rutaProductoAPI: Router;

  constructor() {
    this.rutaProductoAPI = Router();
    this.configuracion();
  }

  public configuracion(): void {
    this.rutaProductoAPI.post("/paginate", productoController.obtenerProductosPaginar);
  }
}

const productoRuta = new ProductoRuta();
export default productoRuta.rutaProductoAPI;
