import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ngrx } from './ngrx.model';
@Injectable({
  providedIn: 'root'
})
export class NgrxApiService {

  constructor(private http: HttpClient) { }

  getNgrxs(): Observable<Ngrx[]>{
    return this.http.get<{ items: Ngrx[] }>(
      'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
    ).pipe(map((ngrxs) => ngrxs.items || []));
  }
}
