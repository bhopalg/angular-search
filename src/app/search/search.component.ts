import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '../auto-unsubscribe/auto-unsubscribe';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASE_POSTER_PATH: string = `http://image.tmdb.org/t/p/w185/`;
const KEY: string = '';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
@AutoUnsubscribe()
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;
  loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm
      .get('search')
      .valueChanges.pipe(
        debounceTime(10000),
        distinctUntilChanged(),
        tap(() => this.loading.next(true)),
        switchMap((searchValue: string) => (searchValue ? this.getFilms(searchValue) : of([]))),
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  getFilms(film: string): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-GB&include_adult=false&query=${film}`,
    );
  }
}
