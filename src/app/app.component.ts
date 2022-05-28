import { Component,OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AlertService } from '@/app/service/alert.service';
import { Router } from '@angular/router';
import { ApiService } from '@/app/service/api.service';
// Angular
import { Deploy } from 'cordova-plugin-ionic/dist/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  navigate:any;
  constructor(public platform: Platform,
              private _location: Location,
              private alertService:AlertService,
              private router: Router,
              private apiService:ApiService,
              private deploy: Deploy) {
    this.platform.ready().then(() => {
        this.sideMenu();
        this.deploy.configure({channel: 'Production'});


        this.apiService.getCoffAll().subscribe();


        //버전체크
        this.checkVersion();
    });
  }

  ngOnInit() {
    this.appExit();
  }

  appExit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/home') || this._location.isCurrentPathEqualTo('/login')) {
        this.alertService.alertConfirm('앱 종료','앱을 종료하시겠습니까??',()=>{},this.exitApp);
      } else {
         // Navigate to back pagea
         console.log('Navigate to back page');
         this._location.back();
      }
    });
  }

  /**
   * @description 앱 이탈
   */
  exitApp(){
    navigator['app'].exitApp();
  }

  /**
   * @description 사이드 메뉴
   */
  sideMenu(){
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Chat",
        url   : "/chat",
        icon  : "chatbox-outline"
      },
      {
        title : "Favorites",
        url   : "/favorites",
        icon  : "heart"
      },
      {
        title : "Update",
        url   : "/update",
        icon  : "heart"
      }
    ]
  }

  clickItem(url:string){
    this.router.navigate([url]);
  }

  async  checkVersion(){
    const versions = await this.deploy.getAvailableVersions();
    console.log('versions : ', versions);
    
  }

  async performManualUpdate() {
    const update = await this.deploy.checkForUpdate();
    if(update){
      console.log('update : ', update);
      
    }
  }

}
