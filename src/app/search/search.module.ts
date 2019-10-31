import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SearchComponent],
  imports: [MaterialModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class SearchModule {}
