import { Router } from "express";
import registroControlador from "../controller/registroControlador";

class RegistroRuta {
  public apiRutaRegistro: Router;

  constructor() {
    this.apiRutaRegistro = Router();
    this.cargarRutas();
  }

  private cargarRutas(): void {
    this.apiRutaRegistro.post("/user", registroControlador.crearUsuario);
  }
}
const accesoRuta = new RegistroRuta();
export default accesoRuta.apiRutaRegistro;
