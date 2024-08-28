import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './token.interceptor';

import { PlantillaModule } from './utilidades/plantilla/plantilla.module';
import { ContenedorModule } from './modulos/contenedor/contenedor.module';

import { ToastrModule } from 'ngx-toastr';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';

import { NgxPaginationModule } from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SpinnerComponent } from './utilidades/plantilla/spinner/spinner.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    NgScrollbarModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,

    PlantillaModule,
    ContenedorModule,
    HttpClientModule,
    NgxPaginationModule,
    TypeaheadModule,
  ],
  providers: [
    Title,
    {
      provide: NG_SCROLLBAR_OPTIONS,
      useValue: {
        visibility: 'hover',
      },
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let title = 'Color Admin';
        const info = this.route.snapshot.firstChild;
        if (info!.data['title'] != null) {
          title = info!.data['title'];
        }
        this.titleService.setTitle(title);
      }
    });
  }
}
