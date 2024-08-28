"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const var_imagenes_1 = __importDefault(require("../../../config/domain/var_imagenes"));
const administrarImagen_1 = __importDefault(require("../../../config/utilities/administrarImagen"));
class ImagenControladorVerificar {
    static procesarRespuesta(regsitros) {
        const rutaImagenError = var_imagenes_1.default.fotoError;
        let arregloBases = new Array();
        regsitros.forEach((imagen) => {
            let base = '';
            let rutaImagenPrivada = var_imagenes_1.default.rutaFotosUsuarios + imagen.nombrePrivadoImagen;
            if (fs_1.default.existsSync(rutaImagenPrivada)) {
                let imagenMiniatura = var_imagenes_1.default.rutaFotosTemporal + imagen.nombrePrivadoImagen;
                administrarImagen_1.default.crearMiniatura(rutaImagenPrivada, imagenMiniatura, 200);
                base = fs_1.default.readFileSync(imagenMiniatura, 'base64');
                fs_1.default.unlinkSync(imagenMiniatura);
            }
            else {
                base = fs_1.default.readFileSync(rutaImagenError, 'base64');
            }
            imagen.base64Imagen = base;
        });
        arregloBases = regsitros;
        return arregloBases;
    }
}
exports.default = ImagenControladorVerificar;
