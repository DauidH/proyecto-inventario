"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
class AdministrarImagen {
    static crearMiniatura(rutaImagenPrivada, imagenMiniatura, tamano) {
        let esperar = true;
        const dataSharp = (0, sharp_1.default)(rutaImagenPrivada)
            .resize({ width: tamano })
            .toFile(imagenMiniatura, (err) => {
            if (err) {
            }
            else {
                esperar = false;
            }
        });
        while (esperar) {
            require("deasync").sleep(200);
        }
        return dataSharp;
    }
    static crearImagen(nombrePrivado, base64, rutaAlmacenarImagen) {
        let decodificacion = base64.replace(/^data:image\/\w+;base64,/, "");
        fs_1.default.readdir(rutaAlmacenarImagen, (err) => {
            if (err) {
                fs_1.default.mkdirSync(rutaAlmacenarImagen, { recursive: true });
            }
            fs_1.default.writeFile(rutaAlmacenarImagen + nombrePrivado, decodificacion, { encoding: "base64" }, function () { });
        });
    }
    static borrarImagen(nombrePrivado, rutaAlmacenarImagen) {
        fs_1.default.unlink(rutaAlmacenarImagen + nombrePrivado, function (error) {
            if (error) {
                console.log("Fallo al borrar la imagen");
            }
        });
    }
}
exports.default = AdministrarImagen;
