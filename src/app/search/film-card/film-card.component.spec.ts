import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardComponent } from './film-card.component';
import { MaterialModule } from '../../material.module';
import { Film } from '../search.models';

const mockFilm: Film = {
  original_title: 'Test',
  title: 'Test',
  overview: 'Testing',
  vote_average: 12,
  poster_path: 'Test',
};

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [FilmCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    component.film = mockFilm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set mat card header with the title from film', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain(mockFilm.title);
  });
});
