import { Component,  EventEmitter,  Input,  OnInit, Output, SimpleChanges } from '@angular/core';
import { Howl } from 'howler';
import { Store } from '@ngrx/store';
import { recordingState } from '../../state/slider.actions';
import { timer } from 'rxjs';
import { SpeechService } from 'src/app/service/speech.service';
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
              private speechService: SpeechService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stopYn.currentValue === false) {
      this.speechService.stopSpeech();
      this.store.dispatch(recordingState({ recordingState: false }));
      this.onChangeDetectEvent.emit();
      if (this.timerObject) {
        this.timerObject.unsubscribe();
      }
    } else {
      //this.startMusic();
    }
  }

  startSpeech() {
    this.speechService.startSpeech(this.options)
      .subscribe(
        (matches) => {
          this.mySpeak.push(matches[0]);
          this.keepRecording();
        },
        (error) => {
          console.error(`startSpeech ${error}`);
          this.mySpeak.push('');
          this.keepRecording();
        });
  }


  keepRecording() {
    if (this.milSecond >= 15) {
      this.stopStt();
      this.timerObject.unsubscribe();
    } else {
      this.startSpeech();
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
    this.store.dispatch(recordingState({ recordingState: true }));
    const source = timer(/* 시작 초*/0, /* 초 간격 */1000);
    this.timerObject = source.subscribe(val => {
      this.milSecond = val;
    });
    this.startSpeech();
  }
}
