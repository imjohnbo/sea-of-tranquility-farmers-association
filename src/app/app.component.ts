import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, catchError, switchMap, map } from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public veggies: any;
  public address: any;
  public searching: any;
  public searchFailed: any;

  constructor(private _data: DataService) {
    
  }

  formatter = (result: string) => result.toUpperCase();

  // Search for services that are tagged with search term
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._data.getVeggies(term).pipe(
          map(data => data.map((d) => {
            return d.serviceName
          })),
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
}
