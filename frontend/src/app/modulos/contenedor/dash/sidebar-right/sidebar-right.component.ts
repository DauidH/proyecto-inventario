import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css'],
})
export class SidebarRightComponent {
  @Output() appSidebarEndMobileToggled = new EventEmitter<boolean>();

  toggleAppSidebarEndMobile() {
    this.appSidebarEndMobileToggled.emit(true);
  }
}
