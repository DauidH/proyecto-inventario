import { Request, Response } from "express";

import Acceso from "../entities/acceso";
import AccesoDao from "../dao/accesoDao";

class AccesoControlador extends AccesoDao {

    public verificarSesion(req: Request, res: Response): void {
        const objAcceso: Acceso = req.body;
        AccesoControlador.iniciarSesion(res, objAcceso);
    }

}
const accesoControlador = new AccesoControlador();
export default accesoControlador;