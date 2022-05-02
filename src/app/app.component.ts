import { Component,OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { AlertService } from '@/app/service/alert.service';
import { Router } from '@angular/router';
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
              private router: Router) {
    this.platform.ready().then(() => {
        this.sideMenu();
    });
  }

  ngOnInit() {
  
  }

  appExit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/home')) {
        this.alertService.alertConfirm('앱 종료','앱을 종료하시겠습니까?',{},this.exitApp);
      } else {
         // Navigate to back page
         console.log('Navigate to back page');
         this._location.back();
      }
    });
  }

  exitApp(){
    navigator['app'].exitApp();
  }

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
    ]
  }

  clickItem(url:string){
    this.router.navigate([url]);
  }
}
