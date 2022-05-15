import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@/app/service/api.service';
import { setUserInfo,setUserInfoLoad } from '../userinfo/userInfo.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AlertService } from '@/app/service/alert.service';
import { Router } from '@angular/router';
@Injectable()
export class UserEffects{
    constructor(private actions$: Actions, 
                private apiService: ApiService, 
                private alertService:AlertService,
                private router:Router){}

    /**
     * @description 
     */
    saveUserInfo$ = createEffect(() => this.actions$.pipe(
        ofType(setUserInfoLoad),
        mergeMap((actions) => 
            this.apiService.login(actions.userInfo)
            .pipe(
                map((res:any) =>{
                    const { success } = res;
                    if(success !== 'ok'){
                        throw 'Login Fail!';
                    }
                    this.router.navigateByUrl('/home');
                    return res;
                }),
                map((user:any) => 
                    setUserInfo(
                        {
                            userInfo: 
                            {
                                UserId: actions.userInfo.UserId,
                                accessToken: user.token
                            }
                        }
                    )
                 ),
                catchError(err => {
                    this.alertService.alert('오류','로그인을 실패하였습니다.',()=>{});
                    throw 'error in source. Details: ' + err;
                })
            )
        )
    ))
}