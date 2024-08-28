class FunciUsuarios {

    public static permisosMenu(funcionalidades: any, permisos: any): any[] {

        let nuevosPermisos: any[] = [];

        if (permisos.rows.length === funcionalidades.rows.length) {
            return permisos.rows;
        }

        funcionalidades.rows.map((funcionalidad: any) => {
            permisos.rows.map((permiso: any) => {
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
export default FunciUsuarios;
