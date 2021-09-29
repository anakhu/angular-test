import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MaterialModules } from './material';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [PaginationComponent, SearchComponent, LoaderComponent],
  imports: [CommonModule, MaterialModules, FormsModule, ReactiveFormsModule],
  exports: [MaterialModules, PaginationComponent, SearchComponent, LoaderComponent],
})
export class SharedModule {}
