import { Response } from "express";
import pool from "../../../../config/connexion/connexionDB";
import { SQL_USUARIO_ACTUALIZAR } from "../repository/usuActualizar_sql";

class UsuarioActualizarDAO {
    protected static async editarUsuario(parametros: any, res: Response): Promise<any> {
        await pool
            .result(SQL_USUARIO_ACTUALIZAR.ACTUALIZAR, parametros)
            .then((resultado) => {
                res.status(200).json({ mensaje: "Usuario Actualizado", respusta: resultado.rowCount });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "ERROR Update ORM" });
            });
    }

    protected static async editarAccesos(parametros: any, res: Response): Promise<any> {
        pool
            .result(SQL_USUARIO_ACTUALIZAR.ACTUALIZAR_ACCESO, parametros)
            .then((resultado: any) => {
                res.status(200).json(resultado.rowCount);
            })
            .catch((err: any) => {
                console.log(err);
                res.status(500).json({ respuesta: "ERORR Update ORM" });
            });
    }
} // end class

export default UsuarioActualizarDAO;