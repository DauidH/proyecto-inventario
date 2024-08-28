import { Router } from 'express';
import funcionalidadControlador from '../controller/funcionalidadControlador';
class FuncionalidadRutas {

    public rutaFuncionalidadApi: Router;

    constructor() {
        this.rutaFuncionalidadApi = Router();
        this.configuracionRutas();
    }

    public configuracionRutas(): void {
        this.rutaFuncionalidadApi.get('/all/:codUsuario', funcionalidadControlador.obtenerFuncUsuario);
        this.rutaFuncionalidadApi.post('/update', funcionalidadControlador.actualizarFuncUsuario);
        this.rutaFuncionalidadApi.get('/count', funcionalidadControlador.obtenerCantidadFuncionalidades);
        this.rutaFuncionalidadApi.get('/menu', funcionalidadControlador.obtenerPermisosMenu);
        this.rutaFuncionalidadApi.get('/all', funcionalidadControlador.obtenerTodas);
    }
}

const funcionalidadRutas = new FuncionalidadRutas();
export default funcionalidadRutas.rutaFuncionalidadApi;
