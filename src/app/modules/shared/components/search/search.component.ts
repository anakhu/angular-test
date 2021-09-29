import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DEFAULT_DEBOUNCE_TIME } from '../../constants/search.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() value: string = '';

  @Input() debounceTime: number = DEFAULT_DEBOUNCE_TIME;

  searchValue: FormControl;

  searchQuery$: Observable<any>;

  @Output() valueChangeEvent = new EventEmitter<string>();

  constructor() {
    this.searchValue = new FormControl();
    this.searchQuery$ = this.searchValue.valueChanges;
  }

  ngOnInit() {
    this.searchValue.setValue(this.value);
    this.searchQuery$
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged())
      .subscribe((value: string) => this.valueChangeEvent.emit(value));
  }

  clearSearch() {
    this.searchValue.setValue('');
  }
}
