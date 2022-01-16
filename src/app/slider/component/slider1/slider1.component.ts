import { Component,  EventEmitter,  Input,  OnInit, Output, SimpleChanges } from '@angular/core';
import { Howl } from 'howler';
import { Store } from '@ngrx/store';
import { recordingState } from '../../state/slider.actions';
import { SpeechService } from 'src/app/service/speech.service';
import { TimerService } from 'src/app/service/timer.service';
import { Observable } from 'rxjs';
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
  $speech: Observable<any>;

  constructor(private store: Store,
              private speechService: SpeechService,
              private timerService: TimerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stopYn.currentValue === false) {
      this.store.dispatch(recordingState({ recordingState: false }));
      this.onChangeDetectEvent.emit();
      if (this.timerObject) {
        this.timerObject.unsubscribe();
      }
    } 
  }

  /**
   * @description : 
   */
  onStartTimer() {
    //this.$timer = this.timerService.startTimer();
    
  }

  onStartSpeech() {
    this.$speech = this.speechService.startSpeech();
  }

  /**
   * @description : stopTimer
   */
  onStopTimer() {
    this.speechService.stopSpeech();
    //this.timerService.stopTimer();
  }
}
