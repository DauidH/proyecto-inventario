export class Acceso {
  public codUsuario: number;
  public correoAcceso: string;
  public claveAcceso: string;

  public reClaveAcceso?: string;
  public nombreRol?: string;
  public nombresUsuario?: string;
  public apellidosUsuario?: string;

  constructor(cod: number, cor: string, cla: string) {
    this.codUsuario = cod;
    this.correoAcceso = cor;
    this.claveAcceso = cla;
  }
}
