export class Categoria {
  public codCategoria: number;
  public nombreCategoria: string;
  public descripcionCategoria: string;
  public estadoCategoria: number;
  public cantidadProducto?: number;

  constructor(cod: number, nom: string, des: string, est: number) {
    this.codCategoria = cod;
    this.nombreCategoria = nom;
    this.descripcionCategoria = des;
    this.estadoCategoria = est;
    this.cantidadProducto = 0;
  }
}
