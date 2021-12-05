import { Component,  Input,  OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Store } from '@ngrx/store';
import { selectMessages } from 'src/app/store/messages/messages.selectors';
import { retrivedMessagesList, addMessage } from 'src/app/store/messages/messages.action';
import { Howl } from 'howler';
@Component({
  selector: 'app-slider1',
  templateUrl: './slider1.component.html',
  styleUrls: ['./slider1.component.css']
})
export class Slider1Component implements OnInit {
  @Input() stopYn: boolean;


  messages$ = this.store.select(selectMessages);
  howl: Howl;
  constructor(private apiService: ApiService, private store: Store) { }

  ngOnInit(): void {
    this.apiService.getMessages().subscribe((messages) => {
      this.store.dispatch(retrivedMessagesList({ messages }))
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stopYn.currentValue === false) {
      this.howl.stop();
    } else {
      this.startMusic();
    }
  }

  add() {
    const message = {
      id: "Me",
      msg: "A",
      assets: ""
    }
    this.store.dispatch(addMessage({ message }));
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
