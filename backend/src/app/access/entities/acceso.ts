class Acceso {
  public codUsuario: number;
  public correoAcceso: string;
  public claveAcceso: string;

  constructor(cod: number, corr: string, cla: string) {
    this.codUsuario = cod;
    this.correoAcceso = corr;
    this.claveAcceso = cla;
  }
}
export default Acceso;
