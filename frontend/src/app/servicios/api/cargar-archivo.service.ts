import { Injectable } from '@angular/core';
import { DatoArchivo } from '../../modelos/dato-archivo';

@Injectable({
  providedIn: 'root',
})
export class CargarArchivoService {
  public archivoCargar: File | null;

  constructor() {
    this.archivoCargar = null;
  }

  public async seleccionarFoto(
    event: Event,
    remplazar: boolean
  ): Promise<DatoArchivo> {
    let caja = this.obtenerCajaImagen(event);
    if (caja.name !== 'error.txt') {
      let base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (dato) => resolve(fileReader.result);
        fileReader.readAsDataURL(caja);
      });

      let baseString = base64 + '';
      if (remplazar) {
        baseString = baseString.replace(/^data:image\/\w+;base64,/, '');
      }
      const salida = new DatoArchivo(
        baseString,
        caja.type,
        caja.name,
        caja.size.toString()
      );

      return salida;
    }
    return new DatoArchivo('', '', '', '');
  }

  private obtenerCajaImagen(evento: Event): File {
    let cajaTemporal = new File(['vacio'], 'error.txt');
    const obj = evento.target as HTMLInputElement;

    Array.prototype.forEach.call(obj.files, (file: File) => {
      cajaTemporal = file;
    });
    if (cajaTemporal.name === 'error.txt') {
      return cajaTemporal;
    }

    if (cajaTemporal.type.match(/image\/*/) == null) {
      return new File(['vacio'], 'error.txt');
    }
    return cajaTemporal;
  }
}
