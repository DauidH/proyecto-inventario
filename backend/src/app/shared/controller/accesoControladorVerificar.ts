import fs from "fs";
import jwt from "jsonwebtoken";

import RespuestaAcceso from "../entities/respuestaAcceso";
import rutasImagenes from "../../../config/domain/var_imagenes";
import AdministrarImagen from "../../../config/utilities/administrarImagen";

class AccesoControladorVerificar {
  public static procesarRespuesta(registro: any): RespuestaAcceso {
    console.log(registro);
    let base = "";
    const rutaImagenSistema = rutasImagenes.fotoDefecto;
    const rutaImagenPrivada = rutasImagenes.rutaFotosUsuarios + registro.nombrePrivadoImagen;
    const token = jwt.sign(
      {
        id: registro.codUsuario,
        correoAcceso: registro.correoAcceso,
        nombreRol: registro.nombreRol,
        nombresUsuario: registro.nombresUsuario,
        apellidosUsuario: registro.apellidosUsuario,
        idRol: registro.codRol,
      },
      "claveSuperSecreta",
      { expiresIn: "14h" }
    );

    if (fs.existsSync(rutaImagenPrivada)) {
      // console.log("Imagen encontrada");
      const imagenMiniatura = rutasImagenes.rutaFotosTemporal + registro.nombreprivadoImagen;
      AdministrarImagen.crearMiniatura(rutaImagenPrivada, imagenMiniatura, 150);
      base = fs.readFileSync(imagenMiniatura, "base64");
      fs.unlinkSync(imagenMiniatura);
    } else {
      // console.log("Imagen por defecto");
      base = fs.readFileSync(rutaImagenSistema, "base64");
    }

    return new RespuestaAcceso(token, base);
  }
}
export default AccesoControladorVerificar;
