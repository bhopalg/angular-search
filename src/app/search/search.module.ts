import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilmCardComponent } from './film-card/film-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SearchComponent, FilmCardComponent],
  imports: [MaterialModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [],
})
export class SearchModule {}
