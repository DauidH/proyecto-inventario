DELETE FROM funcionalidades;
ALTER SEQUENCE funcionalidades_cod_funcionalidad_seq RESTART 1;

/*==============================================================*/
/* Funcionalidades del sistema                                  */
/*==============================================================*/
INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(1, 'ROOT','/private/dash/board', null, '', 'none', 'none',false, false);
INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(200, 'Administración','',1,'fa-solid fa-screwdriver-wrench', 'none', 'none',true, false);
INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(300, 'Inventario','',1,'fa-solid fa-box-archive', 'none', 'none',true, false);

INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(210, 'Roles','/private/role/manage',2,'none', 'none', 'none',true, false);
INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(211, 'Usuarios','/private/user/manage',2,'none', 'none', 'none',true, false);
INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(212, 'Usuarios Crear','/private/user/add',2,'none', 'none', 'none',false, false);
INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(213, 'Usuarios Editar','/private/user/update/{value}',2,'none', 'none', 'none',false, false);

--MENU INVENTARIO
INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(301, 'Categorias','/private/categorias/admin',3,'none', 'none', 'none',true, false);
INSERT INTO funcionalidades (orden_funcionalidad, nombre_funcionalidad, url_funcionalidad,cod_padre ,icono_funcionalidad, etiqueta_funcionalidad, target_funcionalidad, visible_funcionalidad, actividad_funcionalidad) VALUES(302, 'Productos','/private/productos/admin',3,'none', 'none', 'none',true, false);

/*==============================================================*/

/*==============================================================*/
/* Funcionalidades usuarios                                */
/*==============================================================*/
INSERT INTO funcionalidad_usuario(cod_usuario,cod_funcionalidad) (select 1,cod_funcionalidad from funcionalidades);