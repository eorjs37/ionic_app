import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '@/app/service/api.service';
import { setUserInfo,setUserInfoLoad } from '../userinfo/userInfo.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { UserInfo } from '../interface/UserInfo';
@Injectable()
export class UserEffects{
    constructor(private actions$: Actions, private apiService: ApiService){}

    saveUserInfo$ = createEffect(() => this.actions$.pipe(
        ofType(setUserInfoLoad),
        mergeMap((action) => 
            this.apiService.login(action)
            .pipe(
                map((user: UserInfo) => setUserInfo({userInfo:user})),
                catchError(()=>EMPTY)
            )
        )
    ))
}