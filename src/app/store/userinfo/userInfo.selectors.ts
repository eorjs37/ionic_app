import { createFeatureSelector, createSelector} from '@ngrx/store';
import { UserInfo } from "@/app/store/interface/UserInfo";

export const getUserInfo = createFeatureSelector<UserInfo>('userInfo');

export const getUserId = createSelector(
    getUserInfo,
    (state: UserInfo) => state.UserId
)

export const getAccessToken = createSelector(
    getUserInfo,
    (state:UserInfo) => state.accessToken
);