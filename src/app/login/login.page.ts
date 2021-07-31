import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  usernamePlaceHolder: string;
  passwordPlaceHolder: string;
  constructor() {
    this.usernamePlaceHolder = '아이디를 입력해주세요';
    this.passwordPlaceHolder = '패스워드를 입력해주세요.';
  }

  ngOnInit() {
  }

  login() {
    console.log(`username : ${this.username}`);
    console.log(`password : ${this.password}`);
  }

}
