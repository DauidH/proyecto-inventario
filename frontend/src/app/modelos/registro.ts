export class Registro {
  public nombresUsuario: string;
  public apellidosUsuario: string;
  public correoAcceso: string;
  public reCorreoAcceso?: string;
  public claveAcceso: string;
  public reClaveAcceso?: string;

  constructor(nom: string, ape: string, corr: string, cla: string) {
    this.nombresUsuario = nom;
    this.apellidosUsuario = ape;
    this.correoAcceso = corr;
    this.claveAcceso = cla;
    this.reClaveAcceso = '';
    this.reCorreoAcceso = '';
  }
}
