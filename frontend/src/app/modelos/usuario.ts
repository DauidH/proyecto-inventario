export class Usuario {
  public codUsuario: number;
  public documentoUsuario: string;
  public tipoDocumentoUsuario: string;
  public nombresUsuario: string;
  public apellidosUsuario: string;
  public telefonoUsuario: string;
  public codRol: number;
  public estadoUsuario: number;
  public nombreRol?: string;
  public correoAcceso?: string;

  constructor(
    cod: number,
    doc: string,
    tipo: string,
    nom: string,
    ape: string,
    tele: string,
    codRol: number,
    estusua: number
  ) {
    this.codUsuario = cod;
    this.documentoUsuario = doc;
    this.tipoDocumentoUsuario = tipo;
    this.nombresUsuario = nom;
    this.apellidosUsuario = ape;
    this.telefonoUsuario = tele;
    this.codRol = codRol;
    this.estadoUsuario = estusua;
    this.nombreRol = '';
    this.correoAcceso = '';
  }
}
