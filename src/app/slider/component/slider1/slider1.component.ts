import { Component,  EventEmitter,  Input,  OnInit, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Howl } from 'howler';
import { Store } from '@ngrx/store';
import { recordingState } from '../../state/slider.actions';
import { SpeechService } from 'src/app/service/speech.service';
import { Observable } from 'rxjs';
import { SpeechResult } from 'src/app/interface/speechResult';
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
  $speech: Observable<SpeechResult>;
  $timer: Observable<number>;

  constructor(private store: Store,
    private speechService: SpeechService,
  private cd: ChangeDetectorRef) { }

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
    
  }

  onStartSpeech() {
    // this.$timer = this.speechService.startTimer();
    this.$speech = this.speechService.startSpeech();
  }

  /**
   * @description : stopTimer
   */
  onStopTimer() {
    this.speechService.stopTimer();
  }
}
