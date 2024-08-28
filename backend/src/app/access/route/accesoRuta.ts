import { Router } from "express";
import accesoControlador from "../controller/accesoControlador";

class AccesoRuta {
  public apiRutaAcceso: Router;

  constructor() {
    this.apiRutaAcceso = Router();
    this.cargarRutas();
  }

  private cargarRutas(): void {
    this.apiRutaAcceso.post("/check", accesoControlador.verificarSesion);
  }
}
const accesoRuta = new AccesoRuta();
export default accesoRuta.apiRutaAcceso;
