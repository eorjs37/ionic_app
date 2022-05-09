import { Component, OnInit } from '@angular/core';
import { ApiService } from '@/app/service/api.service';
import { UserInfo } from '@/app/store/interface/UserInfo';
import { Store } from '@ngrx/store';
import { setUserInfo } from '@/app/store/userinfo/userInfo.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userInfo: UserInfo = {
    UserId:'',
    accessToken:''
  };
  password:string;
  userId:string;

  constructor(private apiService:ApiService, private userInfoStore: Store<{userInfo: UserInfo}>) { }

  ngOnInit() {
  }

  login(){
    //chleorjs37@gmail.com
    //chleorjs12@
    this.apiService.login({
      UserId:this.userId,
      PassWord:this.password
    })
    .subscribe((data:any)=>{
      console.log('data : ', data);
      const { success, token } = data;
      const userInfo = {
          UserId: this.userId,
          accessToken: token
      }
      if(success === 'ok'){
        this.userInfoStore.dispatch(setUserInfo({userInfo}));
        console.log(this.userInfoStore);
        
      }
    })
  }

}
