import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicUser } from './IonicUser';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl:string = 'https://biggunsite.co.kr';
  constructor(private http: HttpClient) { }
  getUserAll() {
    return this.http.get<IonicUser>(`${this.baseUrl}/api/ionic/user/all`);
  }
}
