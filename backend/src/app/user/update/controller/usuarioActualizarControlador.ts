import { Request, Response } from "express";
import UsuarioActualizarDAO from "../dao/usuarioActualizarDao";

class UsuarioActualizarControlador extends UsuarioActualizarDAO {
    //Para administradores que actualizan datos
    public actualizarUsuarios(req: Request, res: Response): void {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            delete req.body.codUsuario;
            const documento = req.body.documentoUsuario;
            const tipo = req.body.tipoDocumentoUsuario;
            const nombres = req.body.nombresUsuario;
            const apellidos = req.body.apellidosUsuario;
            const telefono = req.body.telefonoUsuario;
            const rol = req.body.codRol;
            const parametros = [documento, tipo, nombres, apellidos, telefono, rol, codigo];
            UsuarioActualizarControlador.editarUsuario(parametros, res);
        } else {
            res.status(400).json({ mensaje: "Usuario no Valido" });
        }
    }

    //Para usuarios que modifican su propio perfil
    public actualizarUsuarioPerfil(req: Request, res: Response): void {
        const codigo = Number(req.body.datosUsuario.id);
        delete req.body.codUsuario;
        const documento = req.body.documentoUsuario;
        const tipo = req.body.tipodocumentoUsuario;
        const nombres = req.body.nombresUsuario;
        const apellidos = req.body.apellidosUsuario;
        const telefono = req.body.telefonoUsuario;
        const rol = req.body.codRol;
        const parametros = [documento, tipo, nombres, apellidos, telefono, rol, codigo];
        UsuarioActualizarControlador.editarAccesos(parametros, res);
    }

    public editarAccesoPerfil(req: Request, res: Response): void {
        const codigo = req.body.codUsuario;
        const nombreAcceso = req.body.correoAcceso;
        const claveAcceso = req.body.claveAcceso;
        const parametros = [nombreAcceso, claveAcceso, codigo];
        UsuarioActualizarControlador.editarAccesos(parametros, res);
    }
}

const usuarioActualizarControlador = new UsuarioActualizarControlador();
export default usuarioActualizarControlador;