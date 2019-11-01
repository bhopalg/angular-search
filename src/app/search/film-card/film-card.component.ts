import { Component, Input } from '@angular/core';
import { Film } from '../search.models';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent {
  @Input() film: Film;
}
