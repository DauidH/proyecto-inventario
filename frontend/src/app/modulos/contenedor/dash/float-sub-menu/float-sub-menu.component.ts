import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AppSettingsService } from './../../../../servicios/plantilla/app-settings.service';

declare var slideToggle: any;

@Component({
  selector: 'app-float-sub-menu',
  templateUrl: './float-sub-menu.component.html',
  styleUrls: ['./float-sub-menu.component.css'],
})
export class FloatSubMenuComponent {
  @Input() menus: any;
  @Input() top: any;
  @Input() left: any;
  @Input() right: any;
  @Input() bottom: any;
  @Input() lineTop: any;
  @Input() lineBottom: any;
  @Input() arrowTop: any;
  @Input() arrowBottom: any;


  @Output() remainAppSidebarFloatSubMenu = new EventEmitter();
  @Output() hideAppSidebarFloatSubMenu = new EventEmitter();
  @Output() calculateFloatSubMenuPosition = new EventEmitter();

  constructor(public appSettings: AppSettingsService) { }

  expandCollapseSubmenu(e: any, currentMenu: any, allMenu: any, active: any) {
    e.preventDefault();
    var targetItem = e.target.closest('.menu-item');
    var target = <HTMLElement>targetItem.querySelector('.menu-submenu');
    slideToggle(target);
    this.calculateFloatSubMenuPosition.emit();
  }

  remainMenu() {
    this.remainAppSidebarFloatSubMenu.emit(true);
  }

  hideMenu() {
    this.hideAppSidebarFloatSubMenu.emit(true);
  }

}
