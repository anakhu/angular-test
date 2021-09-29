import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PAGE_SIZE_OPTIONS, PaginationActions } from '../../constants/pagination.constants';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  readonly actions = PaginationActions;

  @Input() paginationSettings?: Pagination;

  @Input() pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;

  @Output() pageChangeEvent = new EventEmitter<PaginationActions>();

  @Output() pageSizeChangeEvent = new EventEmitter<number>();

  @Output() pageSelectionEvent = new EventEmitter<number>();

  onBtnClick(action: PaginationActions): void {
    this.pageChangeEvent.emit(action);
  }

  onPageSelect($event: FocusEvent) {
    const target = $event.target as HTMLInputElement;
    this.pageSelectionEvent.emit(target.valueAsNumber);
  }

  onPageInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target.valueAsNumber < 1) {
      target.value = '1';
    } else if (
      this.paginationSettings &&
      target.valueAsNumber > this.paginationSettings.totalPages
    ) {
      target.value = this.paginationSettings.totalPages.toString();
    }
  }

  onPageSizeSelect($event: MatSelectChange): void {
    this.pageSizeChangeEvent.emit($event.value);
  }
}
