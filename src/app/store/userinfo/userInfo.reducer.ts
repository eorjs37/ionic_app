import { createReducer, on } from '@ngrx/store';
import {
  setUserInfo,
  setClearUserInfo,
} from '@/app/store/userinfo/userInfo.actions';
import { UserInfo } from '@/app/store/interface/UserInfo';
export const userInfoInitalState: UserInfo = {
  accessToken: '',
  UserId: '',
};

export const userInfoReducer = createReducer(
  userInfoInitalState,
  on(setUserInfo, (_, { userInfo }) => ({
    UserId: userInfo.UserId,
    accessToken: userInfo.accessToken,
  })),
  on(setClearUserInfo, () => ({
    UserId: '',
    accessToken: '',
  }))
);
