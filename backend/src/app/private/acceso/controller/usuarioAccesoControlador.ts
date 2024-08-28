import cifrar from "bcryptjs";
import { Request, Response } from 'express';
import UsuarioAccesoDao from '../dao/usuarioAccesoDao';

class UsuarioAccesoControlador extends UsuarioAccesoDao {

    public obtenerAccesoPerfil(req: Request, res: Response): void {
        const parametros = [req.body.datosUsuario.id];
        UsuarioAccesoControlador.obtenerAcceso(parametros, res);
    }

    public obtenerAccesoUsuario(req: Request, res: Response): void {
        if (!isNaN(Number(req.params.codUsuario))) {
            const codigo = Number(req.params.codUsuario);
            const parametros = [codigo];
            UsuarioAccesoControlador.obtenerAcceso(parametros, res);
        } else {
            res.status(400).json({ 'respuesta': 'Codigo de usuario no valido' });
        }
    }

    public editarAccesoPerfil(req: Request, res: Response): void {

        const codigo = req.body.codUsuario;
        const nombreAcceso = req.body.correoAcceso;
        const claveAcceso = req.body.claveAcceso;
        const cargarClave = Boolean(req.params.cargaClave);
        const cifrada = cifrar.hashSync(claveAcceso as string);
        let parametros = [];
        if (cargarClave) {
            parametros = [nombreAcceso, cifrada, codigo];
        } else {
            parametros = [nombreAcceso, codigo];
        }
        UsuarioAccesoControlador.editarAccesos(parametros,cargarClave, res);
    }

}//end class

const usuarioAccesoControlador = new UsuarioAccesoControlador();
export default usuarioAccesoControlador;
