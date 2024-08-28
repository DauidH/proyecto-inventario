"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolControlador_1 = __importDefault(require("../controller/rolControlador"));
class RolRuta {
    constructor() {
        this.rutaRolAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaRolAPI.post("/add", rolControlador_1.default.agregarRol);
        this.rutaRolAPI.get("/all", rolControlador_1.default.obtenerRoles);
        this.rutaRolAPI.post("/search", rolControlador_1.default.obtenerRolesBuscar);
        this.rutaRolAPI.get("/one/:codRol", rolControlador_1.default.obtenerRol);
        this.rutaRolAPI.get("/search/:cadenaBuscar", rolControlador_1.default.obtenerRolBuscar);
        this.rutaRolAPI.post("/paginate", rolControlador_1.default.obtenerRolesPaginar);
        this.rutaRolAPI.put("/update", rolControlador_1.default.actualizarRol);
        this.rutaRolAPI.delete("/active/:codRol", rolControlador_1.default.activarRol);
        this.rutaRolAPI.delete("/inactive/:codRol", rolControlador_1.default.inactivarRol);
        this.rutaRolAPI.delete("/delete/:codRol", rolControlador_1.default.eliminarRol);
    }
} // End class
const rolRuta = new RolRuta();
exports.default = rolRuta.rutaRolAPI;
