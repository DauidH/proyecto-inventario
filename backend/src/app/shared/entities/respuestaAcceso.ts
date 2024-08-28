class RespuestaAcceso {
  protected tokenApp: string;
  protected fotoApp: string;

  constructor(tok: string, fot: string) {
    this.tokenApp = tok;
    this.fotoApp = fot;
  }
}
export default RespuestaAcceso;
