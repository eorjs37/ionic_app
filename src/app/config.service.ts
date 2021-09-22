import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseUrl = 'https://biggunsite.co.kr';
  constructor(private http: HttpClient) { }

  getUserAll() {
    return this.http.get<any>(this.baseUrl+'/api/ionic/user/all');
  }
}
