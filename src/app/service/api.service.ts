import { Injectable } from '@angular/core';
import { environment,SERVER_URL } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  /**
   * @description : 커피 전체 조회
   */
  getCoffAll(){
    return this.http.get(SERVER_URL+'coffees/all');
  }

  /**
   * @description 로그인
   * @param loginInfo 로그인정보
   * @returns 
   */
  login(loginInfo){

    return this.http.post(SERVER_URL+'ionic/user/login',loginInfo)
  }
}
