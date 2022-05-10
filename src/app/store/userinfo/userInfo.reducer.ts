import { createReducer,on } from "@ngrx/store";
import { setUserInfo } from '@/app/store/userinfo/userInfo.actions'
import { UserInfo } from "@/app/store/interface/UserInfo";
export const userInfoInitalState: UserInfo = {
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