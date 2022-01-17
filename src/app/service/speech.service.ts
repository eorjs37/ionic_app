import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { AlertService } from './alert.service';
import { merge, of, Subject, timer } from 'rxjs';
import { catchError, delay, delayWhen, map, retry, retryWhen, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private $stopSubect = new Subject();
  public sentence: string = '';
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

  speechRec() {
    return this.speechRecognition.startListening({
      'language': 'en-US',
      'showPopup': false,
      'showPartial': true
    })
  }

  startSpeech() {
    let startMil = 0;
    const timer1 = timer(startMil, 1000);

    this.sentence = '';

    const speechrecognition = merge(timer1, this.speechRec())
      .pipe(
        map(x => {
            startMil = typeof x === 'number' ? x : startMil;
            return {
              speech: typeof x === "object" ? this.combineStr(x) : this.sentence,
              count: typeof x === 'number'? x : 0 
            }
          }),
          tap(val => console.log('val1 : ', val)),
          catchError(err => {
            console.error('catchError : ', err);
            console.log('startMil : ', startMil);
            
            return of([]) 
          }),
          retry(1)
         
          // retryWhen(errors =>
          //   errors.pipe(
          //     delayWhen(_ => this.speechRec())
          //   )
          // )
      );

    return speechrecognition;
  }

 

  stopSpeech() {
    this.$stopSubect.next(true);
  }

  /**
   * @description : 문장합치기
   */
  private combineStr(arrayString: Array<string>) {
    if (arrayString.length < 2) {
      if (arrayString[0] !== '') {
        this.sentence += arrayString[0];
      }
    }
    return this.sentence;
  }
}
