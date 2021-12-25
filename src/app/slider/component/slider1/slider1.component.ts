import { Component,  EventEmitter,  Input,  OnInit, Output, SimpleChanges } from '@angular/core';
import { Howl } from 'howler';
import { Store } from '@ngrx/store';
import { recordingState } from '../../state/slider.actions';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
import { timer } from 'rxjs';
@Component({
  selector: 'app-slider1',
  templateUrl: './slider1.component.html',
  styleUrls: ['./slider1.component.css']
})
export class Slider1Component implements OnInit {
  @Input() stopYn: boolean;
  @Output() onChangeDetectEvent= new EventEmitter<string>();
  howl: Howl;
  options: any = {
    'language': 'en-US',
    'showPopup': false
  };
  milSecond: number = 0;
  timerObject: any;
  mySpeak: Array<string> = [];
  constructor(private store: Store,
              private speechRecognition: SpeechRecognition) { }

  ngOnInit(): void {
    this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
      this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stopYn.currentValue === false) {
      //this.howl.stop();
      this.speechRecognition.stopListening();
      this.store.dispatch(recordingState({ recordingState: false }));
      this.onChangeDetectEvent.emit();
      if (this.timerObject) {
        this.timerObject.unsubscribe();
      }
    } else {
      //this.startMusic();
    }
  }

  startStt() {
    this.store.dispatch(recordingState({ recordingState: true }));
    this.speechRecognition.startListening(this.options).subscribe(
      (matches) => {
        this.mySpeak.push(matches[0]);
        this.keepRecording();
      },
      (error) => {
        console.error(`stt ${error}`);
        this.mySpeak.push('');
        this.keepRecording();
      }
    )
  }


  keepRecording() {
    if (this.milSecond >= 15) {
      this.stopStt();
      this.timerObject.unsubscribe();
    } else {
      this.startStt();
    }
  }

  stopStt() {
    console.log('mySpeak : ' , this.mySpeak);
    this.store.dispatch(recordingState({ recordingState: false }));
    this.onChangeDetectEvent.emit();
    this.timerObject.unsubscribe();
  }



  startMusic() {
    this.howl = new Howl({
      src: ['./assets/music/mp3file.mp3'],
      onplay: () => {
        console.log('onplay');
      },
      onend: () => {
        console.log('onend');
      }
    });
    this.howl.play();
  }

  stopMusic() {
    this.howl.stop();
  }

  startTimer() {
    this.mySpeak = [];
    const source = timer(/* 시작 초*/0, /* 초 간격 */1000);
    this.timerObject = source.subscribe(val => {
      this.milSecond = val;
    });
    this.startStt();
  }

  ionViewDidEnter() {
    console.log('slider1 ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('slider1 ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('slider1 ionViewDidLeave');
  }
}
