import { Response } from 'express';
import { SQL_IMAGEN } from '../repository/imagen_sql';
import pool from '../../../config/connexion/connexionDB';
import ImagenControladorVerificar from '../controller/imagenControladorVerificar';
class ImagenDao {

    protected static async crearImagen(parametros: any, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            const nuevaImagen = await consulta.one(SQL_IMAGEN.CREAR_IMAGEN, parametros);
            await consulta.none(SQL_IMAGEN.ACTUALIZA_IMAGEN_FAVORITA, [nuevaImagen.codImagen]);
            return consulta.result(SQL_IMAGEN.ACTUALIZA_IMAGEN_NO_FAVORITA, [nuevaImagen.codImagen, parametros[0]]);
        }).then(resultado => {
            res.status(200).json({ 'mensaje': 'Registro Actulizado', 'resultado': resultado.rowCount });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ 'Respuesta': 'Imagen Favorita no valida' });
        });
    }

    protected static async cargarImagenes(sql: string, parametros: any, res: Response): Promise<any> {
        pool.result(sql, parametros).then(resultado => {
            const arreglo = resultado.rows;

            if (arreglo.length > 0) {
                let imagenes = ImagenControladorVerificar.procesarRespuesta(arreglo);
                res.status(200).json(imagenes);
            } else {
                res.status(402).json({ 'mensaje': 'Consulta con Registros vacios' })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ 'Mensaje': 'Fallo al obtener las Imagenes' })
        })
    }

    protected static async eliminarImagen(parametros: any, res: Response): Promise<any> {
        await pool.task(async (consulta) => {
            const imagenFavorita: any = await consulta.result(SQL_IMAGEN.INFO_REGISTRO, parametros);
            if (imagenFavorita.rows[0].favoritaImagen != 1) {
                return await consulta.result(SQL_IMAGEN.POR_CODIGO, parametros);
            } else {
                await consulta.none(SQL_IMAGEN.POR_CODIGO, parametros);
                const codigoNuevaFavorita = await consulta.one(SQL_IMAGEN.BUSCAR_UNA, imagenFavorita.rows[0].codUsuario);
                await consulta.none(SQL_IMAGEN.ACTUALIZA_IMAGEN_FAVORITA, [imagenFavorita.rows[0].codUsuario, codigoNuevaFavorita.codImagen]);
                return await consulta.result(SQL_IMAGEN.ACTUALIZA_IMAGEN_NO_FAVORITA, [imagenFavorita.rows[0].codUsuario, codigoNuevaFavorita.codImagen]);
            }
        }).then(resultado => {
            res.status(200).json({ 'mensaje': 'registro e imagen eliminada', 'respuesta': resultado.rowCount });
        }).catch(error => {
            console.log(error);
            res.status(400).json({ 'respuesta': 'Imagen no eliminada' });
        })
    }


    protected static async imagenFavorita(parametros: any, res: Response): Promise<any> {
        await pool.task(async consulta => {
            await consulta.none(SQL_IMAGEN.ACTUALIZA_IMAGEN_FAVORITA, parametros);
            return consulta.result(SQL_IMAGEN.ACTUALIZA_IMAGEN_NO_FAVORITA, parametros);
        }).then(resultado => {
            res.status(200).json({ 'mensaje': 'Registro Actulizado', 'resultado': resultado.rowCount });
        }).catch(error => {
            console.log(error);
            res.status(500).json({ 'Respuesta': 'Imagen Favorita no valida' });
        });

    }

}

export default ImagenDao;
