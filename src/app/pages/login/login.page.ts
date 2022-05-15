import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@/app/store/interface/UserInfo';
import { Store } from '@ngrx/store';
import { setUserInfoLoad } from '@/app/store/userinfo/userInfo.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@/app/service/alert.service';
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
  loginGroup:any = {
    userId:'',
    password:''
  };
  loginForm: FormGroup;
  userId:string;

  constructor(private userInfoStore: Store<{userInfo: UserInfo}>, private alertService:AlertService) { }

  ngOnInit() {
    
  }

  async login(){
    //chleorjs37@gmail.com
    //chleorjs12@

    const userId = new FormControl(this.loginGroup.userId,[
      Validators.required,
      Validators.email
    ]);
    const password = new FormControl(this.loginGroup.password,[
      Validators.required
    ]);


    if(userId.errors?.['required']){
      this.alertService.alert('오류','아이디를 입력해주세요.',()=>{});
      return false;
    }else if(userId.errors?.['email']){
      this.alertService.alert('오류','이메일형식으로 입력해주세요.',()=>{});
      return false;
    }


    if(password.errors?.['required']){
      this.alertService.alert('오류','비밀번호를 입력해주세요.',()=>{});
      return false;
    }
    
    const userInfo = {
      UserId:this.loginGroup.userId,
      PassWord:this.loginGroup.password
    }
    await this.userInfoStore.dispatch(setUserInfoLoad({userInfo}));
  }

}
