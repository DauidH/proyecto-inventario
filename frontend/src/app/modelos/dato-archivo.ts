export class DatoArchivo {
  public base64: string;
  public tipo: string;
  public nombrepublico: string;
  public tamano: string;
  public archivoCompleto: File;

  constructor(bas: string, tip: string, nom: string, tam: string) {
    this.base64 = bas;
    this.tipo = tip;
    this.nombrepublico = nom;
    this.tamano = tam;
    this.archivoCompleto = new File([''], '', { type: 'text/plain' });
  }

  public setArchivoCompleto(dato: File): void {
    this.archivoCompleto = dato;
  }
}
