/*==============================================================*/
/* Extensión para buscar sin tildes                             */
/*==============================================================*/
CREATE EXTENSION unaccent;

/*==============================================================*/
/* Roles de prueba                                              */
/*==============================================================*/
INSERT INTO roles (nombre_rol, estado_rol) VALUES ('Administrador',1);
INSERT INTO roles (nombre_rol, estado_rol) VALUES ('Usuario',1);

/*==============================================================*/
/* Usuarios base sistema                                    */
/*==============================================================*/
INSERT INTO usuarios(cod_usuario, cod_rol, documento_usuario, tipo_documento_usuario, nombres_usuario, apellidos_usuario, telefono_usuario, estado_usuario ) VALUES (1, 1, '000000', '11', 'Admin', '', '0000000000', 1);

ALTER SEQUENCE usuarios_cod_usuario_seq RESTART 2;

/*==============================================================*/
/* Imágenes de prueba para usuarios                             */
/*==============================================================*/
INSERT INTO imagenes(cod_imagen, cod_usuario, nombre_publico_imagen, nombre_privado_imagen, tipo_imagen, tamanio_imagen, favorita_imagen) VALUES (1,1,'fotoAdmin.jpeg', '1_BX-81NlXBl.jpeg', 'image/jpeg', '191883', 1);

ALTER SEQUENCE imagenes_cod_imagen_seq RESTART 3;

/*==============================================================*/
/* Accesos de usuario                                */
/*==============================================================*/
INSERT INTO accesos(cod_usuario, correo_acceso, clave_acceso ) VALUES (1,'admin@gmail.com','$2a$12$C/BN0nTOu8El8/WbPm4Rk.WKqyIeMCLiSB95eEa6YgqSwD.cVNlHy');

/*==============================================================*/
/* inserts de categorias                            */
/*==============================================================*/
INSERT INTO categorias(nombre_categoria, descripcion_categoria, estado_categoria)
VALUES ('LACTEOS', 'N/A', 1);

INSERT INTO categorias(nombre_categoria, descripcion_categoria, estado_categoria)
VALUES ('CARNICOS', 'N/A', 1);

INSERT INTO categorias(nombre_categoria, descripcion_categoria, estado_categoria)
VALUES ('ELECTRICOS', 'N/A', 1);

INSERT INTO categorias(nombre_categoria, descripcion_categoria, estado_categoria)
VALUES ('ROPA', 'N/A', 1);

INSERT INTO categorias(nombre_categoria, descripcion_categoria, estado_categoria)
VALUES ('CALZADO', 'N/A', 1);

INSERT INTO categorias(nombre_categoria, descripcion_categoria, estado_categoria)
VALUES ('TECNOLOGIA', 'N/A', 1);

ALTER SEQUENCE categorias_cod_categoria_seq RESTART 7;