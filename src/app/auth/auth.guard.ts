import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserInfo } from '@/app/store/interface/UserInfo';
import { getAccessToken } from '@/app/store/userinfo/userInfo.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  UserLogedIn: boolean = false;

  constructor(
    private router: Router,
    private userInfoStore: Store<{ userInfo: UserInfo }>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userInfoStore.select(getAccessToken).subscribe(
      (token) => {
        if (token) {
          this.UserLogedIn = true;
          return true;
        } else {
          this.UserLogedIn = false;
          return false;
        }
      },
      (err) => {
        console.error('token error : ', err);
        return false;
      }
    );

    if (this.UserLogedIn) {
      return true;
    }

    // 로그인 하지 않은 경우, 자동으로 login 컴포넌트로 이동
    this.router.navigate(['/login']);
  }
}
