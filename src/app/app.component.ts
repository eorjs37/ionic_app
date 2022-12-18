import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AlertService } from '@/app/service/alert.service';
import { Router } from '@angular/router';
import { UserInfo } from '@/app/store/interface/UserInfo';
import { Store } from '@ngrx/store';
import { setClearUserInfo } from '@/app/store/userinfo/userInfo.actions';
import { ApiService } from '@/app/service/api.service';
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
import { environment } from '@/environments/environment';
import { PushnotificationService } from '@/app/service/pushnotification.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  navigate: any;
  constructor(
    public userInfoStore: Store<{ userInfo: UserInfo }>,
    public platform: Platform,
    private _location: Location,
    private alertService: AlertService,
    private router: Router,
    private apiService: ApiService,
    private deploy: Deploy,
    private pushNotficationServcie: PushnotificationService
  ) {
    this.platform.ready().then(async () => {
      this.apiService.getCoffAll().subscribe();
      this.sideMenu();

      await this.deploy.configure({
        appId: environment.appId,
        updateMethod: 'none',
        channel: environment.channel,
      });

      //push notifications
      this.pushNotficationServcie.hasAuth();

      const update = await this.deploy.checkForUpdate();

      if (update.available) {
        this.router.navigate(['/update']);
      }
    });
  }

  ngOnInit() {
    this.appExit();

    console.log(this.userInfoStore);
  }

  appExit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (
        this._location.isCurrentPathEqualTo('/home') ||
        this._location.isCurrentPathEqualTo('/login')
      ) {
        this.alertService.alertConfirm(
          '앱 종료',
          '앱을 종료하시겠습니까??',
          () => {},
          this.exitApp
        );
      } else {
        // Navigate to back pagea
        console.log('Navigate to back page');
        this._location.back();
      }
    });
  }

  /**
   * @description 로그아웃
   */
  appLogOut() {}

  /**
   * @description 앱 이탈
   */
  exitApp() {
    navigator['app'].exitApp();
  }

  /**
   * @description 사이드 메뉴
   */
  sideMenu() {
    this.navigate = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home',
      },
      {
        title: 'Chat',
        url: '/chat',
        icon: 'chatbox-outline',
      },
      {
        title: '로그아웃',
        url: '/logout',
        icon: 'log-out',
      },
    ];
  }

  clickItem(url: string) {
    if (url === '/logout') {
      this.alertService.alertConfirm(
        '로그아웃',
        '로그아웃 하시겠습니까?',
        () => {},
        () => {
          this.userInfoStore.dispatch(setClearUserInfo());
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate([url]);
    }
  }
}
