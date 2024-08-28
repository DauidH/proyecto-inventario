"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connexionDB_1 = __importDefault(require("../../../config/connexion/connexionDB"));
const productos_sql_1 = require("../repository/productos_sql");
class ProductosDao {
    static obtenerProductosPaginador(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connexionDB_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuestas = [];
                const cantidad = yield consulta.one(productos_sql_1.SQL_PRODUCTOS.CANTIDAD_PRODUCTOS, parametros);
                respuestas.push(cantidad);
                const registros = yield consulta.result(productos_sql_1.SQL_PRODUCTOS.OBTENER_PRODUCTOS_PAGINADOR, parametros);
                respuestas.push(registros.rows);
                return respuestas;
            }))
                .then((resultado) => {
                res.status(200).json(resultado);
            })
                .catch((err) => {
                res.status(400).json({ mensaje: "Fallo la consulta en el backend" });
                console.log(err);
            });
        });
    }
}
exports.default = ProductosDao;
