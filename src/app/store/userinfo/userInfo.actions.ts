import { createAction ,props} from "@ngrx/store";
import { UserInfo } from "../interface/UserInfo";
export const setUserInfo = createAction('UserInfo setUserInfo', props<{userInfo :UserInfo}>());