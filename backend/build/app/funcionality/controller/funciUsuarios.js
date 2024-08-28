"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FunciUsuarios {
    static permisosMenu(funcionalidades, permisos) {
        let nuevosPermisos = [];
        if (permisos.rows.length === funcionalidades.rows.length) {
            return permisos.rows;
        }
        funcionalidades.rows.map((funcionalidad) => {
            permisos.rows.map((permiso) => {
                if (permiso.codFuncionalidad == funcionalidad.codFuncionalidad
                    || permiso.codPadre == funcionalidad.codFuncionalidad) {
                    nuevosPermisos.push(funcionalidad);
                }
            });
        });
        nuevosPermisos = nuevosPermisos.filter((permiso, index) => {
            return nuevosPermisos.indexOf(permiso) === index;
        });
        return nuevosPermisos;
    }
}
exports.default = FunciUsuarios;
