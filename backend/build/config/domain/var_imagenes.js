"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let typeDeploy = 1;
let rutaInicial = "";
if (typeDeploy == 1) {
    rutaInicial = "./";
}
else {
    rutaInicial = "./home/masfacilito/domains/backminerva.masfacilito.xyz/public_html/";
}
exports.default = {
    rutaFotosUsuarios: rutaInicial + "src/doc/image/photo/",
    rutaFotosSistema: rutaInicial + "src/doc/image/system/",
    rutaFotosTemporal: rutaInicial + "src/doc/image/tmp/",
    fotoDefecto: rutaInicial + "src/doc/image/system/porDefecto.png",
    fotoError: rutaInicial + "src/doc/image/system/porDefecto.png",
};
