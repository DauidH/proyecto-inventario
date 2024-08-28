"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const respuestaAcceso_1 = __importDefault(require("../entities/respuestaAcceso"));
const var_imagenes_1 = __importDefault(require("../../../config/domain/var_imagenes"));
const administrarImagen_1 = __importDefault(require("../../../config/utilities/administrarImagen"));
class AccesoControladorVerificar {
    static procesarRespuesta(registro) {
        console.log(registro);
        let base = "";
        const rutaImagenSistema = var_imagenes_1.default.fotoDefecto;
        const rutaImagenPrivada = var_imagenes_1.default.rutaFotosUsuarios + registro.nombrePrivadoImagen;
        const token = jsonwebtoken_1.default.sign({
            id: registro.codUsuario,
            correoAcceso: registro.correoAcceso,
            nombreRol: registro.nombreRol,
            nombresUsuario: registro.nombresUsuario,
            apellidosUsuario: registro.apellidosUsuario,
            idRol: registro.codRol,
        }, "claveSuperSecreta", { expiresIn: "14h" });
        if (fs_1.default.existsSync(rutaImagenPrivada)) {
            // console.log("Imagen encontrada");
            const imagenMiniatura = var_imagenes_1.default.rutaFotosTemporal + registro.nombreprivadoImagen;
            administrarImagen_1.default.crearMiniatura(rutaImagenPrivada, imagenMiniatura, 150);
            base = fs_1.default.readFileSync(imagenMiniatura, "base64");
            fs_1.default.unlinkSync(imagenMiniatura);
        }
        else {
            // console.log("Imagen por defecto");
            base = fs_1.default.readFileSync(rutaImagenSistema, "base64");
        }
        return new respuestaAcceso_1.default(token, base);
    }
}
exports.default = AccesoControladorVerificar;
