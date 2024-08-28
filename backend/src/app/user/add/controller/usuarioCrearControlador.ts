import { nanoid } from "nanoid";
import { Request, Response } from "express";
import UsuarioCrearDAO from "../dao/usuarioCrearDao";

class UsuarioCrearControlador extends UsuarioCrearDAO {
    public crearUsuario(req: Request, res: Response): void {
        const rol = req.body.codRol;
        const documento = req.body.documentoUsuario;
        const tipo = req.body.tipoDocumentoUsuario;
        const nombres = req.body.nombresUsuario;
        const apellidos = req.body.apellidosUsuario;
        const telefono = req.body.telefonoUsuario;
        const claveAcceso = "pendiente";
        const parametros = [documento, tipo, nombres, apellidos, telefono, rol, "PX_" + nanoid(15), claveAcceso];
        UsuarioCrearControlador.crearUsuarios(parametros, res);
    }
}
const usuarioCrearControlador = new UsuarioCrearControlador();
export default usuarioCrearControlador;