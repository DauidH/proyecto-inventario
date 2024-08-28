import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-panel',
  inputs: ['title', 'variant', 'noBody', 'noButton', 'headerClass', 'bodyClass', 'footerClass', 'panelClass'],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  @ViewChild('panelFooter', { static: false }) panelFooter;

  public expand = false;
  public reload = false;
  public collapse = false;
  public remove = false;
  public showFooter = false;

  public title = '';
  public variant = '';
  public noBody = '';
  public noButton = '';
  public headerClass = '';
  public bodyClass = '';
  public footerClass = '';
  public panelClass = '';

  private tmp: any;

  constructor() {
    this.panelFooter = this.tmp;
  }

  ngOnInit() {
    setTimeout(() => {
      this.showFooter = this.panelFooter ? this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0 : false;
    });
  }

  panelExpand() {
    this.expand = !this.expand;
  }

  panelReload() {
    this.reload = true;

    setTimeout(() => {
      this.reload = false;
    }, 1500);
  }

  panelCollapse() {
    this.collapse = !this.collapse;
  }

  panelRemove() {
    this.remove = !this.remove;
  }
}
