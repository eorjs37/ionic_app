import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private UserId: string;
  private PassWord: string;
  private UserIdPlaceHolder: string;
  private PassWordPlaceHolder: string;
  constructor(private http: HttpClient) {
    this.UserIdPlaceHolder = '아이디를 입력해주세요.';
    this.PassWordPlaceHolder = '패스워드를 입력해주세요.';
  }

  ngOnInit() {
  }

  login() {
    const headerType = new HttpHeaders({ 'Content-Type': 'application/json' });
    headerType.append('Access-Control-Allow-Origin', '*');
    this.http.get('/api/ionic/user/all', { headers: headerType }).subscribe((res) => {
      console.log(res);
    });
  }
}
