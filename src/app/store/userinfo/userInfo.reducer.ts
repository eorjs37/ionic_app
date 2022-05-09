import { createReducer,on } from "@ngrx/store";
import { setUserInfo } from '@/app/store/userinfo/userInfo.actions'

export const userInfoInitalState: any = {
    accessToken : localStorage.getItem('accessToken') || '',
    UserId : localStorage.getItem('UseId') || ''
}

export const userInfoReducer = createReducer(
    userInfoInitalState,
    on(setUserInfo, (_,{userInfo})=> ({
        UserId: userInfo.UserId,
        accessToken: userInfo.accessToken
    }))
)