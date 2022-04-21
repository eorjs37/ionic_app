import { Component,OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public platform: Platform,
              private _location: Location) {
    
    this.platform.ready().then(() => {
      console.log('platform ready');
      this.appExit();
    });
  }

  ngOnInit() {
  
  }

  appExit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/home')) {
        console.log('Show Exit Alert!');
        if (confirm('끄시겠습니까?')) {
          navigator['app'].exitApp();
        }
      } else {
         // Navigate to back page
         console.log('Navigate to back page');
         this._location.back();
      }
    });
  }
}
