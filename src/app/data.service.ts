import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const SERVICE_URL= `http://open-disco-imjohnbo.glitch.me/find/`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getVeggies(term: string): Observable<any> {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(`${SERVICE_URL}/?tags=${term}`).pipe(
        map((response: any) => {
          console.log(response.disco);
          return response.disco;
        })
      );
  }
}
