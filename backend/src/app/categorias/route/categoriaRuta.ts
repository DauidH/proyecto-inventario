import { Router } from "express";
import categoriaController from "../controller/categoriaControlador";

class CategoriaRuta {
  public rutaCategoriaAPI: Router;

  constructor() {
    this.rutaCategoriaAPI = Router();
    this.configuracion();
  }

  public configuracion(): void {
    this.rutaCategoriaAPI.post("/add", categoriaController.agregarCategoria);
    this.rutaCategoriaAPI.post("/paginate", categoriaController.obtenerCategoriasPaginar);
    this.rutaCategoriaAPI.post("/search", categoriaController.obtenerCategoriasBuscar);
    this.rutaCategoriaAPI.get("/one/:codCategoria", categoriaController.obtenerCategoria);
    this.rutaCategoriaAPI.get("/search/:cadenaBuscar", categoriaController.obtenerCategoriaBuscar);
    this.rutaCategoriaAPI.put("/update", categoriaController.actualizarCategoria);
    this.rutaCategoriaAPI.delete("/delete/:codCategoria", categoriaController.eliminarCategoria);
  }
}

const categoriaRuta = new CategoriaRuta();
export default categoriaRuta.rutaCategoriaAPI;
