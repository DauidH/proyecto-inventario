import { Response } from "express";
import pool from "../../../../config/connexion/connexionDB";
import { SQL_USUARIO_LISTAR } from "../repository/usuListar_sql";

class UsuarioListarDAO {
    protected static async informacionBasica(parametros: any, res: Response): Promise<any> {
        await pool
            .result(SQL_USUARIO_LISTAR.INFO_BASICA, parametros)
            .then((resultado: any) => {
                res.status(200).json(resultado.rows[0]);
            })
            .catch((err: any) => {
                console.log(err);
                res.status(400).json({ Respuesta: "Error find to ORM" });
            });
    }

    protected static async informacionPaginar(parametros: any, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                const respuestas = [];
                const cantidad = await consulta.one(SQL_USUARIO_LISTAR.CANTIDAD_USUARIOS, parametros);
                respuestas.push(cantidad);
                const registros = await consulta.result(SQL_USUARIO_LISTAR.TODOS_USUARIOS_PAGINAR, parametros);
                respuestas.push(registros.rows);
                return respuestas;
            })
            .then((resultado: any) => {
                res.status(200).json(resultado);
            })
            .catch((err: any) => {
                console.log(err);
                res.status(400).json({ Respuesta: "Error Find ORM" });
            });
    }

    protected static async obtenerUsuarioBuscar(parametros: any, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                const respuestas = [];
                const cantidad = await consulta.one(SQL_USUARIO_LISTAR.CANTIDAD_USUARIOS_BUSCAR, parametros);
                respuestas.push(cantidad);
                const registros = await consulta.result(SQL_USUARIO_LISTAR.TODOS_USUARIOS_BUSCAR, parametros);
                respuestas.push(registros.rows);
                return respuestas;
            })
            .then((resultado: any) => {
                res.status(200).json(resultado);
            })
            .catch((err: any) => {
                console.log(err);
                res.status(400).json({ Respuesta: "Error Find ORM" });
            });
    }
}

export default UsuarioListarDAO;