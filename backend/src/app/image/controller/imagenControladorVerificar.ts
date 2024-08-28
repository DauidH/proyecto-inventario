import fs from "fs";
import rutasImagenes from "../../../config/domain/var_imagenes";
import AdministrarImagen from "../../../config/utilities/administrarImagen";

class ImagenControladorVerificar {

    public static procesarRespuesta(regsitros: any): Array<any> {
        const rutaImagenError = rutasImagenes.fotoError;
        let arregloBases = new Array<any>();
        regsitros.forEach((imagen: any) => {
            let base = '';
            let rutaImagenPrivada = rutasImagenes.rutaFotosUsuarios + imagen.nombrePrivadoImagen;
            if (fs.existsSync(rutaImagenPrivada)) {
                let imagenMiniatura = rutasImagenes.rutaFotosTemporal + imagen.nombrePrivadoImagen;
                AdministrarImagen.crearMiniatura(rutaImagenPrivada, imagenMiniatura, 200);
                base = fs.readFileSync(imagenMiniatura, 'base64');
                fs.unlinkSync(imagenMiniatura);
            } else {
                base = fs.readFileSync(rutaImagenError, 'base64');
            }
            imagen.base64Imagen = base;
        });
        arregloBases = regsitros;
        return arregloBases;
    }

}

export default ImagenControladorVerificar;