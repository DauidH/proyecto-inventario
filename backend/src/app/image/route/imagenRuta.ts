import { Router } from 'express';
import imagenControlador from '../controller/imagenControlador';

class ImagenRuta {

    public apiRutaImagen: Router;

    constructor() {
        this.apiRutaImagen = Router();
        this.config();
    }

    public config(): void {
        this.apiRutaImagen.post('/add', imagenControlador.crearFoto);
        this.apiRutaImagen.get('/all/:codUsuario', imagenControlador.obtenerImagenesUsuario);
        this.apiRutaImagen.get('/favorite/:codImagen/:codUsuario', imagenControlador.imagenFavorita);
        this.apiRutaImagen.delete('/delete/:codImagen', imagenControlador.eliminarImagen);
    }
}

const imagenRuta = new ImagenRuta();
export default imagenRuta.apiRutaImagen;
