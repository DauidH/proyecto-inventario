export class Funcionalidad {
  public codFuncionalidad: number;
  public codPadre: number;
  public ordenFuncionalidad: number;
  public nombreFuncionalidad: string;
  public urlFuncionalidad: string;
  public iconoFuncionalidad: string;
  public etiquetaFuncionalidad: string;
  public targetFuncionalidad: string;
  public visibleFuncionalidad?: boolean;
  public actividadFuncionalidad?: boolean;

  public arregloHijos: Funcionalidad[];

  constructor(
    codf: number,
    codp: number,
    orde: number,
    nomb: string,
    urlf: string,
    icon: string,
    etiq: string,
    targ: string
  ) {
    this.codFuncionalidad = codf;
    this.codPadre = codp;
    this.ordenFuncionalidad = orde;
    this.nombreFuncionalidad = nomb;
    this.urlFuncionalidad = urlf;
    this.iconoFuncionalidad = icon;
    this.etiquetaFuncionalidad = etiq;
    this.targetFuncionalidad = targ;

    this.arregloHijos = [];
  }
}
