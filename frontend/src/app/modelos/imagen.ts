export class Imagen {
  public codImagen: number;
  public codUsuario: number;
  public nombrePublicoImagen: string;
  public nombrePrivadoImagen: string;
  public tipoImagen: string;
  public tamanioImagen: string;
  public favoritaImagen: number;
  public base64Imagen: string;

  constructor(
    codi: number,
    cod: number,
    nom: string,
    nomp: string,
    tipo: string,
    tama: string,
    fav: number,
    base: string
  ) {
    this.codImagen = codi;
    this.codUsuario = cod;
    this.nombrePublicoImagen = nom;
    this.nombrePrivadoImagen = nomp;
    this.tipoImagen = tipo;
    this.tamanioImagen = tama;
    this.favoritaImagen = fav;
    this.base64Imagen = base;
  }
}
