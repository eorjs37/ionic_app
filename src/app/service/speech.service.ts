import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  constructor(private speechRecognition: SpeechRecognition,
    public platform: Platform,
    private alertService: AlertService) {
  
    this.platform.ready()
      .then(() => {
        this.isRecognition();
      })
  }


  /**
   * @description : recognition 여부
   */
  isRecognition() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          console.log('not permisson');
          this.requestPermission();
        }
      })
  }

  requestPermission() {
    console.log('requestPermission');
    
    this.speechRecognition.requestPermission()
      .then(
        () => {
          console.log('Granted');
        },
        () => {
          this.alertService.alert('녹음권한', '녹음이 불가능합니다', this.exitApp );
        })
  }

  exitApp() {
    navigator['app'].exitApp();
  }

  /**
   * @description : startRecognition 시작
   */
  startSpeech(options: any) {
    return this.speechRecognition.startListening(options)
  }

  /**
   * @description : stopRecognition 
   */
  stopSpeech() { 
    return this.speechRecognition.stopListening();
  }
}
