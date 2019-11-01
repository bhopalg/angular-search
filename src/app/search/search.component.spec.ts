import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent, BASE_POSTER_PATH } from './search.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilmCardComponent } from './film-card/film-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Film } from './search.models';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [SearchComponent, FilmCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFilms() when something is typed in the search bar', () => {
    jest.useFakeTimers();
    const spyOn = jest.spyOn(component, 'getFilms');
    component.searchForm.patchValue({ search: 'Test' });
    jest.advanceTimersByTime(1001);
    fixture.detectChanges();
    expect(spyOn).toHaveBeenCalledWith('Test');
  });

  it('should update poster path with base url', () => {
    const mockFilms: Film[] = [
      {
        original_title: 'Test',
        title: 'Test',
        overview: 'Testing',
        vote_average: 12,
        poster_path: 'Test',
      },
    ];
    const expectedFilms: Film[] = [
      {
        ...mockFilms[0],
        poster_path: `${BASE_POSTER_PATH}${mockFilms[0].poster_path}`,
      },
    ];
    const result: Film[] = component.buildPostUrl(mockFilms);
    expect(result).toEqual(expectedFilms);
  });
});
