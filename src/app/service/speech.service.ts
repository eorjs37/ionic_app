import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { AlertService } from './alert.service';
import { interval, merge,  Observable,  of,  Subject, timer } from 'rxjs';
import { catchError, takeUntil, tap, startWith, retryWhen, delay, map, delayWhen, finalize, take } from 'rxjs/operators';
import { SpeechResult } from '../interface/speechResult';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private $stopSubect = new Subject();
  public sentence: string = '';
  private errorCount: number = 0;
  private  config = {
    'language': 'en-US',
    'showPopup': false,
    'showPartial': true
  }
  private counting: number = 0;
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

  startTimer() : Observable<number>{
    return timer(0, 1000)
      .pipe(
        tap(count => {
          console.log(`counting : `, count);
          this.counting = count;
        }),
        takeUntil(this.$stopSubect)
    )
  }

  stopTimer() {
    this.$stopSubect.next(true);
  }

  /**
   * 
   */
  startSpeech(): Observable<SpeechResult>{
    this.errorCount = 0;
    return this.speech().pipe(
      startWith(this.startTimer().subscribe()),
      map(x => x[0]),
      retryWhen(errors =>
        errors.pipe(
          tap((error) => {
            console.log('error : ' , error);
            if (this.counting > 100) {
              console.log('stopCounting : ' , this.counting);
              this.speechRecognition.stopListening();
              throw errors;
            }
          }), 
          delayWhen(_ => this.speech()),
        )
      ),
      catchError((error) => {
        console.error('error : ', error);
        return of('');
      }),
      finalize(() => {
        console.log('startSpeech finalize');
        this.$stopSubect.next(false);
      })
    )
  }

  mergeSpeech(): Observable<SpeechResult>{
    const speechMerge = merge(this.speech(), this.startTimer());

    return speechMerge.pipe(
      map(_ => {
        return {
          count: 1,
          matches :''
        }
      }),
      retryWhen(errors =>
        errors.pipe(
          delayWhen(_ => speechMerge)
        )
      )
    );
  }

  speech() {
    return this.speechRecognition.startListening(this.config);
  }

  stopSpeech(): Observable<string>{
    console.log('stop speech');
    
    this.speechRecognition.stopListening()
      .then(() => {
        this.$stopSubect.next(false);
      });
    return of('');
  }

}
