import { Response } from "express";
import { SQL_ESTADO_USUARIO } from "../repository/usuEstado_sql";
import pool from "../../../../config/connexion/connexionDB";

class UsuarioEliminarDAO {
    protected static async cambiarEstado(estado: number, parametros: any, res: Response): Promise<any> {
        await pool
            .task((consulta) => {
                if (estado == 1) {
                    return consulta.result(SQL_ESTADO_USUARIO.ACTIVAR_USUARIO, parametros);
                } else {
                    return consulta.result(SQL_ESTADO_USUARIO.INACTIVAR_USUARIO, parametros);
                }
            })
            .then((resultado) => {
                res.status(200).json({ mensaje: " Exitó cambio de estado", respusta: resultado.rowCount });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "ERROR update ORM" });
            });
    }
} // end class

export default UsuarioEliminarDAO;