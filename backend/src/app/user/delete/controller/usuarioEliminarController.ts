import { Request, Response } from "express";
import UsuarioEstadoDAO from "../dao/usuarioEliminarDao";

class UsuarioEliminarControlador extends UsuarioEstadoDAO {
    public inactivarUsuarios(req: Request, res: Response): void {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            const inactivo = 2;
            UsuarioEliminarControlador.cambiarEstado(inactivo, parametros, res);
        } else {
            res.status(400).json({ mensaje: "Usuario no valido" });
        }
    }

    public activarUsuario(req: Request, res: Response): void {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            const activo = 1;
            UsuarioEliminarControlador.cambiarEstado(activo, parametros, res);
        } else {
            res.status(400).json({ mensaje: "Usuario no valido" });
        }
    }
}

const usuarioEliminarControlador = new UsuarioEliminarControlador();
export default usuarioEliminarControlador;