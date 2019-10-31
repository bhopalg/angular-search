import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '../auto-unsubscribe/auto-unsubscribe';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Film, APIReponse } from './search.models';

const KEY: string = '086de18cdd64c38581465040046aac72';
const BASE_POSTER_PATH: string = `http://image.tmdb.org/t/p/w185`;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
@AutoUnsubscribe()
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;
  loading = new BehaviorSubject<boolean>(false);
  films: BehaviorSubject<Film[]> = new BehaviorSubject<Film[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm
      .get('search')
      .valueChanges.pipe(
        debounceTime(0),
        distinctUntilChanged(),
        tap(() => this.loading.next(true)),
        switchMap((searchValue: string) => (searchValue ? this.getFilms(searchValue) : of([]))),
        map((films: APIReponse) => this.buildPostUrl(films.results)),
      )
      .subscribe((films: Film[]) => {
        this.films.next(films);
        this.loading.next(false);
      });
  }

  buildPostUrl(films: Film[]): Film[] {
    const clonedFilms: Film[] = [...films];
    return clonedFilms.map((film: Film) => ({
      ...film,
      poster_path: `${BASE_POSTER_PATH}${film.poster_path}`,
    }));
  }

  getFilms(film: string): Observable<APIReponse> {
    return this.http.get<APIReponse>(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-GB&include_adult=false&query=batman`,
    );
  }
}
