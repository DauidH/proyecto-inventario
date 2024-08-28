export class Rol {
  public codRol: number;
  public nombreRol: string;
  public estadoRol: number;
  public cantidadUsuarios?: number;

  constructor(cod: number, nom: string, esta: number) {
    this.codRol = cod;
    this.nombreRol = nom;
    this.estadoRol = esta;
    this.cantidadUsuarios = 0;
  }
}
