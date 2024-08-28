import { Response } from "express";
import { SQL_USUARIO_CREAR } from "../repository/usuCrear_sql";
import pool from "../../../../config/connexion/connexionDB";
import { SQL_PERMISO } from "../../../shared/repository/permiso_sql";

class UsuarioCrearDAO {
    protected static async crearUsuarios(parametros: any, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                const nuevoUsuario = await consulta.one(SQL_USUARIO_CREAR.USUARIO, parametros);
                parametros.push(nuevoUsuario.codUsuario);
                await consulta.none(SQL_USUARIO_CREAR.ACCESO, parametros);
                await consulta.none(SQL_PERMISO.CREAR_PERMISO, nuevoUsuario.codUsuario);
                return nuevoUsuario.codUsuario;
            })
            .then((resultado) => {
                res.status(200).json({ codUsuario: resultado });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ respuesta: "Error Create ORM" });
            });
    }
} // end class

export default UsuarioCrearDAO;