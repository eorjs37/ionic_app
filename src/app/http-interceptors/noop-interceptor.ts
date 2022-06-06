import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserInfo } from '@/app/store/interface/UserInfo';
import { getAccessToken } from '@/app/store/userinfo/userInfo.selectors';
import { concatMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '@/app/service/alert.service';

/** 인자로 받은 HTTP 요청을 조작하지 않고, 다음 핸들러로 전달합니다. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    private token: String = '';
    constructor(private userInfoStore: Store<{userInfo: UserInfo}>, 
                private router:Router, 
                private alertService:AlertService){
                    
        this.userInfoStore.select(getAccessToken).pipe(
            concatMap((token) => {
                if(!token){
                    if(this.router.url !== '/login'){
                        this.router.navigateByUrl('/login');
                    }
                    return 'fail';
                }
                this.token = token;
                this.router.navigateByUrl('/home');
                return token;
            })
        ).subscribe();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqClone = req.clone({
            setHeaders:{
                auth: String(this.token)
            }
        });

        return next.handle(reqClone)
    }
}