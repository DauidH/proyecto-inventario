import { Request, Response } from 'express';

import { nanoid } from 'nanoid';
import ImagenDao from '../dao/imagenDao';
import { SQL_IMAGEN } from '../repository/imagen_sql';
import rutasImagenes from "../../../config/domain/var_imagenes";
import AdministrarImagen from '../../../config/utilities/administrarImagen';

class ImagenControlador extends ImagenDao {

    public obtenerImagenesUsuario(req: Request, res: Response): void {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            ImagenControlador.cargarImagenes(SQL_IMAGEN.OBTENER_IMAGENES, codigo, res);
        } else {
            res.status(500).json({ 'mensaje': 'codigo usuario no valido' });
        }
    }

    public crearFoto(req: Request, res: Response): void {
        delete req.body.datosUsuario;
        delete req.body.codImagen;
        const tipo = req.body.tipoImagen;
        const codigo = req.body.codUsuario;
        const tamano = req.body.tamanioImagen;
        const nombre = req.body.nombrePublicoImagen;
        const nombrePrivado = codigo + '_' + nanoid(10) + '.' + tipo.split('/')[1];
        const rutaImagenSistema = rutasImagenes.rutaFotosUsuarios;

        AdministrarImagen.crearImagen(nombrePrivado, req.body.base64Imagen, rutaImagenSistema);
        const parametros = [codigo, nombre, nombrePrivado, tipo, tamano];
        ImagenControlador.crearImagen(parametros, res);
    }

    public eliminarImagen(req: Request, res: Response): void {
        const parametros = Number([req.params.codImagen]);
        const rutaImagenSistema = rutasImagenes.fotoDefecto;

        AdministrarImagen.borrarImagen(req.body.nombreprivadoImagen, rutaImagenSistema);
        ImagenControlador.eliminarImagen(parametros, res);
    }

    public imagenFavorita(req: Request, res: Response): void {
        if (!isNaN(Number(req.params.codImagen)) && !isNaN(Number(req.params.codUsuario))) {
            const codigoImagen = Number(req.params.codImagen);
            const codigoUsuario = Number(req.params.codUsuario);
            const parametros = [codigoImagen, codigoUsuario];
            ImagenControlador.imagenFavorita(parametros, res);
        } else {
            res.status(400).json({ 'mensaje': 'Codigo no valido' });
        }
    }

}
const imagenControlador = new ImagenControlador();
export default imagenControlador;
