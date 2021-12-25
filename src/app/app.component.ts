import { Component,OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public platform: Platform,private router: Router,private _location: Location, private speechRecognition: SpeechRecognition) {
    
    this.platform.ready().then(() => {
      console.log('platform ready');
      this.appExit();
    });
  }

  ngOnInit() {
    this.reqeustPermission();
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

  reqeustPermission() {
    this.speechRecognition.requestPermission()
      .then(
         () => { console.log('Granted') }
        ,() => { console.log('Denied') }
      )
  }
}
