import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Funcionalidad } from 'src/app/modelos/funcionalidad';
import { catchError, finalize, map, Subscription } from 'rxjs';
import { AccesoService } from 'src/app/servicios/api/acceso.service';
import { FuncionalidadService } from 'src/app/servicios/api/funcionalidad.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

declare var $: any;

import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';

@Component({
  selector: 'app-usuario-permiso',
  templateUrl: './usuario-permiso.component.html',
  styleUrls: ['./usuario-permiso.component.css'],
})
export class UsuarioPermisoComponent {
  @Input()
  codUsuario: any;

  public arregloArbol: any[];
  public arregloFuncionalidades: Funcionalidad[];
  public arregloFuncionalidadUsuario: Funcionalidad[];

  private tmp: any;
  public cargaFinalizada: boolean;
  public suscripcionFuncionalidad: Subscription;
  public suscripcionUsuario: Subscription;
  public suscripcionAgregar: Subscription;

  constructor(private toastr: ToastrService, private funcionalidadService: FuncionalidadService, private accesoService: AccesoService) {
    this.arregloFuncionalidadUsuario = [];
    this.arregloFuncionalidades = [];
    this.arregloArbol = [];

    this.suscripcionFuncionalidad = this.tmp;
    this.suscripcionUsuario = this.tmp;
    this.suscripcionAgregar = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.obtenerPermisosUsuario();
  }

  ngOnDestroy() {
    if (this.suscripcionFuncionalidad) {
      this.suscripcionFuncionalidad.unsubscribe();
    }
    if (this.suscripcionUsuario) {
      this.suscripcionUsuario.unsubscribe();
    }
    if (this.suscripcionAgregar) {
      this.suscripcionAgregar.unsubscribe();
    }
  }

  public obtenerFuncionalidades(): void {
    this.suscripcionUsuario = this.funcionalidadService
      .obtenerTodasFuncionalidades()
      .pipe(
        map((respuesta: Funcionalidad[]) => {
          this.arregloFuncionalidades = respuesta;
          respuesta.forEach((item) => {
            switch (item.codPadre) {
              case null:
                break;
              case 1:
                this.arregloArbol.push({
                  title: item.nombreFuncionalidad,
                  key: item.codFuncionalidad,
                  folder: true,
                  expanded: true,
                  children: [],
                });
                break;
              default:
                this.arregloArbol.forEach((itemHijos) => {
                  if (item.codPadre === itemHijos.key) {
                    itemHijos.children.push({
                      title: item.nombreFuncionalidad,
                      key: item.codFuncionalidad,
                    });
                  }
                });
                break;
            }
          });

          return respuesta;
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(() => {
          // this.items();
          this.cargaFinalizada = true;
          setTimeout(() => {
            this.items();
          }, 1200);
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerPermisosUsuario(): void {
    this.suscripcionFuncionalidad = this.funcionalidadService
      .obtenerFuncionalidades(this.codUsuario)
      .pipe(
        map((respuesta: any) => {
          this.arregloFuncionalidadUsuario = respuesta;
          return respuesta;
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(() => {
          this.obtenerFuncionalidades();
        })
      )
      .subscribe(observadorAny);
  }

  public items(): void {
    const $arregloFuncionalidades = this.arregloArbol;
    let tmpArray: Array<any>;
    const $arregloPerimsos = this.arregloFuncionalidadUsuario;
    const tree = $('#fancyTree').fancytree({
      checkbox: true,
      selectMode: 3,
      source: $arregloFuncionalidades,
      init: function (event: any, data: any) {
        data.tree.visit(function (node: any) {
          if (node.key != 0) {
            $arregloPerimsos.forEach((item) => {
              if (node.key == item.codFuncionalidad) {
                node.setSelected(true);
              }
            });
          }
        });
      },
      select: function (event: any, data: any) {
        tmpArray = [];
        const seleccionados = $.map(data.tree.getSelectedNodes(), function (node: any) {
          return node;
        });
        seleccionados.forEach((item: any) => {
          tmpArray.push({ codigo: item.key, nombre: item.title });
        });
      },
    });

    $('#btnDesSeleccionar').on('click', () => {
      $.ui.fancytree.getTree('#fancyTree').visit((node: any) => {
        node.setSelected(false);
      });
    });

    $('#btnSeleccionar').on('click', () => {
      $.ui.fancytree.getTree('#fancyTree').visit((node: any) => {
        node.setSelected(true);
      });
    });

    $('#btnEnviar').on('click', () => {
      let tmpPermisos: any = [];
      tmpArray.forEach((item) => {
        tmpPermisos.push({
          codFuncionalidad: Number(item.codigo),
          codUsuario: this.codUsuario,
        });
      });
      tmpPermisos.push({ codFuncionalidad: 1, codUsuario: this.codUsuario });
      this.suscripcionAgregar = this.funcionalidadService
        .actualizarFuncionalidadUsuario(tmpPermisos)
        .pipe(
          map((respuesta) => {
            mostrarMensaje('success', 'Permisos Asignados', 'Exito', this.toastr);
            return respuesta;
          }),
          catchError((err) => {
            mostrarMensaje('danger', 'Error al denegar permisos', 'Error', this.toastr);
            throw err;
          })
        )
        .subscribe(observadorAny);
    });
  }
  /*    public items(): void {

       $("#jstree").jstree({
         "plugins": ["wholerow", "checkbox", "types"],
         "core": {
           "themes": { "responsive": false },
           "data": [{
             "text": "Same but with checkboxes",
             "children": [{
               "text": "initially selected",
               "state": { "selected": true }
             }, {
               "text": "Folder 1"
             }]
           }]
         }
       });
     } */
}
