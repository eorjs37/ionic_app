import { createAction, props } from '@ngrx/store';
import { UserInfo } from '../interface/UserInfo';
export const setUserInfoLoad = createAction(
  'UserInfo Load',
  props<{ userInfo: any }>()
);
export const setUserInfo = createAction(
  'UserInfo setUserInfo',
  props<{ userInfo: UserInfo }>()
);
export const setClearUserInfo = createAction('UserInfo setClearUserInfo');
