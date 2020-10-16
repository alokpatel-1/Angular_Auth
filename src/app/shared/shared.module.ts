import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { DatatableComponent } from './datatable/datatable.component';
// import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule],
  exports: [DatatableComponent],
})
export class SharedModule {}
