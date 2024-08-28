import { Router } from 'express';
import usuarioAccesoControlador from '../controller/usuarioAccesoControlador';

class InformacionAccesoRutas {
    public rutaUsuAccesoAPI: Router;

    constructor() {
        this.rutaUsuAccesoAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaUsuAccesoAPI.put('/update/:cargaClave', usuarioAccesoControlador.editarAccesoPerfil);
        this.rutaUsuAccesoAPI.get('/info', usuarioAccesoControlador.obtenerAccesoPerfil);
        this.rutaUsuAccesoAPI.get('/info/:codUsuario', usuarioAccesoControlador.obtenerAccesoUsuario);
    }

}
const informacionAccesoRutas = new InformacionAccesoRutas();
export default informacionAccesoRutas.rutaUsuAccesoAPI;
