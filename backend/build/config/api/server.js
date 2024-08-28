"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const permiso_1 = __importDefault(require("../../middleware/permiso"));
const seguridad_1 = __importDefault(require("../../middleware/seguridad"));
/* Rutas Api Publica */
const accesoRuta_1 = __importDefault(require("../../app/access/route/accesoRuta"));
const registroRuta_1 = __importDefault(require("../../app/register/route/registroRuta"));
/*  Rutas Api Privado */
const rolRuta_1 = __importDefault(require("../../app/role/route/rolRuta"));
const imagenRuta_1 = __importDefault(require("../../app/image/route/imagenRuta"));
const usuarioRuta_1 = __importDefault(require("../../app/user/route/usuarioRuta"));
const usuarioAccesoRuta_1 = __importDefault(require("../../app/private/acceso/route/usuarioAccesoRuta"));
const funcionalidadRuta_1 = __importDefault(require("../../app/funcionality/route/funcionalidadRuta"));
const categoriaRuta_1 = __importDefault(require("../../app/categorias/route/categoriaRuta"));
const productoRuta_1 = __importDefault(require("../../app/productos/route/productoRuta"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.loadConfiguration();
        this.loadRoutes();
    }
    loadConfiguration() {
        this.app.set("PORT", 3000);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: "500mb" }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    loadRoutes() {
        this.app.use("/api/public/login", accesoRuta_1.default);
        this.app.use("/api/public/register", registroRuta_1.default);
        this.app.use("/api/private/user", seguridad_1.default.verificarToken, permiso_1.default.verificarPermiso, usuarioRuta_1.default);
        this.app.use("/api/private/role", seguridad_1.default.verificarToken, permiso_1.default.verificarPermiso, rolRuta_1.default);
        this.app.use("/api/private/funcionality", seguridad_1.default.verificarToken, permiso_1.default.verificarPermiso, funcionalidadRuta_1.default);
        this.app.use("/api/private/access", seguridad_1.default.verificarToken, permiso_1.default.verificarPermiso, usuarioAccesoRuta_1.default);
        this.app.use("/api/private/image", seguridad_1.default.verificarToken, permiso_1.default.verificarPermiso, imagenRuta_1.default);
        this.app.use("/api/private/categoria", seguridad_1.default.verificarToken, permiso_1.default.verificarPermiso, categoriaRuta_1.default);
        this.app.use("/api/private/producto", seguridad_1.default.verificarToken, permiso_1.default.verificarPermiso, productoRuta_1.default);
    }
    startServer() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("servidor funcionando en el puerto: ", this.app.get("PORT"));
        });
    }
}
exports.default = Server;
