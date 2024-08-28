import { Router } from "express";
import rolControlador from "../controller/rolControlador";

class RolRuta {
    public rutaRolAPI: Router;

    constructor() {
        this.rutaRolAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaRolAPI.post("/add", rolControlador.agregarRol);
        this.rutaRolAPI.get("/all", rolControlador.obtenerRoles);
        this.rutaRolAPI.post("/search", rolControlador.obtenerRolesBuscar);
        this.rutaRolAPI.get("/one/:codRol", rolControlador.obtenerRol);
        this.rutaRolAPI.get("/search/:cadenaBuscar", rolControlador.obtenerRolBuscar);
        this.rutaRolAPI.post("/paginate", rolControlador.obtenerRolesPaginar);
        this.rutaRolAPI.put("/update", rolControlador.actualizarRol);
        this.rutaRolAPI.delete("/active/:codRol", rolControlador.activarRol);
        this.rutaRolAPI.delete("/inactive/:codRol", rolControlador.inactivarRol);
        this.rutaRolAPI.delete("/delete/:codRol", rolControlador.eliminarRol);
    }
} // End class
const rolRuta = new RolRuta();
export default rolRuta.rutaRolAPI;
