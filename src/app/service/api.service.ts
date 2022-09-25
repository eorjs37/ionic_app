import { Injectable } from '@angular/core';
import { SERVER_URL } from '@/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    'Access-Control-Allow-Origin': '*',
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /**
   * @description : 커피 전체 조회
   */
  getCoffAll() {
    return this.http.get(SERVER_URL + 'coffees/all', this.httpOptions);
  }

  /**
   * @description 로그인
   * @param loginInfo 로그인정보
   * @returns
   */
  login(loginInfo) {
    return this.http.post(SERVER_URL + 'ionic/user/login', loginInfo);
  }
}
