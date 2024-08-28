import fs from "fs";
import sharp from "sharp";

class AdministrarImagen {
  public static crearMiniatura(
    rutaImagenPrivada: string,
    imagenMiniatura: string,
    tamano: number
  ): any {
    let esperar = true;
    const dataSharp = sharp(rutaImagenPrivada)
      .resize({ width: tamano })
      .toFile(imagenMiniatura, (err) => {
        if (err) {
        } else {
          esperar = false;
        }
      });
    while (esperar) {
      require("deasync").sleep(200);
    }
    return dataSharp;
  }

  public static crearImagen(
    nombrePrivado: string,
    base64: string,
    rutaAlmacenarImagen: string
  ): void {
    let decodificacion = base64.replace(/^data:image\/\w+;base64,/, "");
    fs.readdir(rutaAlmacenarImagen, (err) => {
      if (err) {
        fs.mkdirSync(rutaAlmacenarImagen, { recursive: true });
      }
      fs.writeFile(
        rutaAlmacenarImagen + nombrePrivado,
        decodificacion,
        { encoding: "base64" },
        function () {}
      );
    });
  }

  public static borrarImagen(
    nombrePrivado: string,
    rutaAlmacenarImagen: string
  ): void {
    fs.unlink(rutaAlmacenarImagen + nombrePrivado, function (error) {
      if (error) {
        console.log("Fallo al borrar la imagen");
      }
    });
  }
}

export default AdministrarImagen;
