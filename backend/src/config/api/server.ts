import cors from "cors";
import morgan from "morgan";
import express from "express";

import permiso from "../../middleware/permiso";
import seguridad from "../../middleware/seguridad";

/* Rutas Api Publica */
import rutaAPIAcceso from "../../app/access/route/accesoRuta";
import apiRutaRegistro from "../../app/register/route/registroRuta";

/*  Rutas Api Privado */
import apiRutaRol from "../../app/role/route/rolRuta";
import apiRutaImagen from "../../app/image/route/imagenRuta";
import apiRutaUsuario from "../../app/user/route/usuarioRuta";
import apiRutaUsuAcceso from "../../app/private/acceso/route/usuarioAccesoRuta";
import apiRutaFuncionalidad from "../../app/funcionality/route/funcionalidadRuta";
import apiRutaCategoria from "../../app/categorias/route/categoriaRuta";
import apiRutaProducto from "../../app/productos/route/productoRuta";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.loadConfiguration();
    this.loadRoutes();
  }

  public loadConfiguration(): void {
    this.app.set("PORT", 3000);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "500mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public loadRoutes(): void {
    this.app.use("/api/public/login", rutaAPIAcceso);
    this.app.use("/api/public/register", apiRutaRegistro);

    this.app.use("/api/private/user", seguridad.verificarToken, permiso.verificarPermiso, apiRutaUsuario);
    this.app.use("/api/private/role", seguridad.verificarToken, permiso.verificarPermiso, apiRutaRol);
    this.app.use("/api/private/funcionality", seguridad.verificarToken, permiso.verificarPermiso, apiRutaFuncionalidad);
    this.app.use("/api/private/access", seguridad.verificarToken, permiso.verificarPermiso, apiRutaUsuAcceso);
    this.app.use("/api/private/image", seguridad.verificarToken, permiso.verificarPermiso, apiRutaImagen);
    this.app.use("/api/private/categoria", seguridad.verificarToken, permiso.verificarPermiso, apiRutaCategoria);
    this.app.use("/api/private/producto", seguridad.verificarToken, permiso.verificarPermiso, apiRutaProducto);
  }

  public startServer(): void {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("servidor funcionando en el puerto: ", this.app.get("PORT"));
    });
  }
}
export default Server;
