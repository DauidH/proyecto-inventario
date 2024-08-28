import { Router } from "express";
import usuarioCrearControlador from "../add/controller/usuarioCrearControlador";
import usuarioListarControlador from "../list/controller/usuarioListarControlador";
import usuarioActualizarControlador from "../update/controller/usuarioActualizarControlador";
import usuarioEliminarControlador from "../delete/controller/usuarioEliminarController";

class UsuarioRuta {
  public apiRutaUsuario: Router;

  constructor() {
    this.apiRutaUsuario = Router();
    this.cargarRutas();
  }

  private cargarRutas(): void {
    this.apiRutaUsuario.post("/paginate", usuarioListarControlador.consultarUsuariosPaginar);
    this.apiRutaUsuario.post("/search", usuarioListarControlador.consultarUsuariosBuscar);
    this.apiRutaUsuario.get("/infouser/:codUsuario", usuarioListarControlador.obtenerInformacionUsuario);
    this.apiRutaUsuario.get("/infomation", usuarioListarControlador.obtenerInfoBasicaPerfil);
    // Crear
    this.apiRutaUsuario.post("/add", usuarioCrearControlador.crearUsuario);
    // Actualizar
    this.apiRutaUsuario.put("/update/:codUsuario", usuarioActualizarControlador.actualizarUsuarios);
    this.apiRutaUsuario.put("/updateprofile/:codUsuario", usuarioActualizarControlador.actualizarUsuarioPerfil);
    // Borrar
    this.apiRutaUsuario.delete("/active/:codUsuario", usuarioEliminarControlador.activarUsuario);
    this.apiRutaUsuario.delete("/inactive/:codUsuario", usuarioEliminarControlador.inactivarUsuarios);
  }
}
const usuarioRuta = new UsuarioRuta();
export default usuarioRuta.apiRutaUsuario;
