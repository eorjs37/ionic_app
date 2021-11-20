import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicUser } from './IonicUser';
import { Messages } from './interface/messages';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://biggunsite.co.kr';
  mockUrl: string = './assets/mock';
  constructor(private http: HttpClient) { }
  getUserAll() {
    return this.http.get<IonicUser>(`${this.baseUrl}/api/ionic/user/all`);
  }

  getMessages() {
    return this.http.get<Messages[]>(`${this.mockUrl}/messages.json`)
      .pipe(map((messages) => messages || []));
  }
}
