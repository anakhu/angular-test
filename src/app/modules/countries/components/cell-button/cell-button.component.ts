import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-cell-button',
  templateUrl: './cell-button.component.html',
  styleUrls: ['./cell-button.component.scss'],
})
export class CellButtonComponent implements AgRendererComponent {
  params!: ICellRendererParams & { iconClass: string };

  agInit(params: ICellRendererParams & { iconClass: string }): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams & { iconClass: string }): boolean {
    return this.params !== params;
  }
}
