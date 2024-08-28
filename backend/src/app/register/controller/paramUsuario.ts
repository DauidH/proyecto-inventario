import { nanoid } from "nanoid";
import { Request, Response } from "express";
import Usuario from "../entities/usuario";

type tipoParametro = { nuevoUsuario: Usuario; arregloNuevoUsuario: string[] };

class ParamUsuario {
  public static armar(req: Request): tipoParametro {
    const documento = "DOC_" + nanoid(15);

    const nuevoUsuario: Usuario = new Usuario();
    nuevoUsuario.documentoUsuario = documento;
    nuevoUsuario.tipoDocumentoUsuario = "PD";
    nuevoUsuario.nombresUsuario = req.body.nombresUsuario;
    nuevoUsuario.apellidosUsuario = req.body.apellidosUsuario;
    nuevoUsuario.telefonoUsuario = "No disponible";
    nuevoUsuario.codRol = 2;
    nuevoUsuario.estadoUsuario = 1;
    nuevoUsuario.correoAcceso = req.body.correoAcceso;
    nuevoUsuario.claveAcceso = req.body.claveAcceso;

    const arregloNuevoUsuario: any[] = [
      nuevoUsuario.documentoUsuario,
      nuevoUsuario.tipoDocumentoUsuario,
      nuevoUsuario.nombresUsuario,
      nuevoUsuario.apellidosUsuario,
      nuevoUsuario.telefonoUsuario,
      nuevoUsuario.codRol,
      nuevoUsuario.estadoUsuario,
      nuevoUsuario.correoAcceso,
      nuevoUsuario.claveAcceso,
    ];
    return { nuevoUsuario, arregloNuevoUsuario };
  }
}
export default ParamUsuario;
