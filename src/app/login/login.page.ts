import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  login(){
    this.apiService.login({
      UserId:'chleorjs37@gmail.com',
      PassWord:'chleorjs12@'
    })
    .subscribe((data)=>{
      console.log('data : ', data);
      
    })
  }

}
