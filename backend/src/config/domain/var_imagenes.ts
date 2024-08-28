let typeDeploy: number = 1;
let rutaInicial: string = "";

if (typeDeploy == 1) {
  rutaInicial = "./";
} else {
  rutaInicial = "./home/masfacilito/domains/backminerva.masfacilito.xyz/public_html/";
}

export default {
  rutaFotosUsuarios: rutaInicial + "src/doc/image/photo/",
  rutaFotosSistema: rutaInicial + "src/doc/image/system/",
  rutaFotosTemporal: rutaInicial + "src/doc/image/tmp/",
  fotoDefecto: rutaInicial + "src/doc/image/system/porDefecto.png",
  fotoError: rutaInicial + "src/doc/image/system/porDefecto.png",
};
