import { Request, Response } from "express";

import RegistroDAO from "../dao/registroDao";
import ParamUsuario from "../controller/paramUsuario";

class RegistroControlador extends RegistroDAO {
    public crearUsuario(req: Request, res: Response): void {
        const { nuevoUsuario, arregloNuevoUsuario } = ParamUsuario.armar(req);
        RegistroControlador.nuevoUsuario(nuevoUsuario, arregloNuevoUsuario, res);
    }
}
const registroControlador = new RegistroControlador();
export default registroControlador;