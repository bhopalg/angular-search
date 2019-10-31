import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [MaterialModule],
  providers: [],
})
export class SearchModule {}
