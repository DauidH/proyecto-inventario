export class Producto {
  public codProducto: number;
  public referenciaProducto: string;
  public nombreProducto: string;
  public descripcionProducto: string;
  public precioVentaProducto: number;
  public estadoProducto: number;
  public nombreCategoria?: string;

  constructor(cod: number, ref: string, nom: string, des: string, pve: number, est: number) {
    this.codProducto = cod;
    this.referenciaProducto = ref;
    this.nombreProducto = nom;
    this.descripcionProducto = des;
    this.precioVentaProducto = pve;
    this.estadoProducto = est;
    this.nombreCategoria = '';
  }
}
