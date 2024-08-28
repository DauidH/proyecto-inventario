import { Request, Response } from "express";
import { OPC_BUSQ_USUARIO } from "../../../../config/domain/var_opc_busc_usuarios";
import UsuarioListarDAO from "../dao/usuarioListarDao";

class UsuarioListarControlador extends UsuarioListarDAO {
    public consultarUsuariosPaginar(req: Request, res: Response): void {
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [cantidadMostrar, valorRegistro];

        UsuarioListarControlador.informacionPaginar(parametros, res);
    }

    public consultarUsuariosBuscar(req: Request, res: Response): void {
        const columnaBuscar = OPC_BUSQ_USUARIO[Number(req.body.columnaBuscar)];
        const dato = req.body.cadenaBuscar;
        const paginaActual = Number(req.body.paginaActual);
        const cantidadMostrar = Number(req.body.cantidadMostrar);
        const valorRegistro = (paginaActual - 1) * cantidadMostrar;
        const parametros = [columnaBuscar, dato, cantidadMostrar, valorRegistro];
        UsuarioListarControlador.obtenerUsuarioBuscar(parametros, res);
    }

    public obtenerInfoBasicaPerfil(req: Request, res: Response): void {
        const parametros = [req.body.datosUsuario.id];
        UsuarioListarControlador.informacionBasica(parametros, res);
    }

    // Verificación permiso
    public obtenerInformacionUsuario(req: Request, res: Response): void {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            UsuarioListarControlador.informacionBasica(parametros, res);
        } else {
            res.status(500).json({ respuesta: "Codigo de usuario no valido" });
        }
    }
}

const usuarioListarControlador = new UsuarioListarControlador();
export default usuarioListarControlador;