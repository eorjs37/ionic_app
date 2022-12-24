import { Injectable } from '@angular/core';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
@Injectable({
  providedIn: 'root',
})
export class PushnotificationService {
  constructor(
    private fcm: FCM,
    private localNotifications: LocalNotifications
  ) {}

  /**
   * @description : getToken
   */
  getToken() {
    this.fcm.getToken().then((token) => {
      console.log('getToken : ', token);
    });
  }

  /**
   * @description : 권한 존재 여부
   */
  hasAuth() {
    this.fcm.hasPermission().then((hasPermission) => {
      console.log('hasPermission : ', hasPermission);

      if (!hasPermission) {
        this.fcm.requestPushPermission().then((result) => {
          if (result) {
            this.getToken();
          }
        });
      } else {
        this.getToken();
      }
    });
  }

  /**
   * @description : localNotification
   */
  onNotifications() {
    this.fcm.onNotification().subscribe((data) => {
      this.localNoti(data);
    });
  }

  localNoti(data) {
    this.localNotifications.schedule({
      text: data.text,
      trigger: { at: new Date(new Date().getTime() + 1000) },
    });
  }

  /**
   * @description : getAuth
   */
  getAuth() {}
}
