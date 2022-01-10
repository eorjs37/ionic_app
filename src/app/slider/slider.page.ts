import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides,IonContent } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRecording } from './state/slider.selectors';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonContent) ionContent: IonContent;
  pager: boolean;
  stopSliderMusic: boolean | true;
  test: number = 10;
  slideOpts = {
    initialSlide: 0,
    speed: 200,
    autoHeight: true,
    onInit: () => {
      
    }
  };
  sliderNumber: number = 0;
  recordingState$ = this.store.select(selectRecording);
  constructor(private cd: ChangeDetectorRef, private store: Store) {
  }

  ngOnInit() {
    this.recordingState$.subscribe(data => {
      console.log('data : ' , data);
      
    })
  } 

  ionViewWillEnter() {
  }

  async slideChanged() {
    this.sliderNumber = await this.slides.getActiveIndex();
    if (this.sliderNumber === 0) {
      this.stopSliderMusic = true;
    } else {
      this.stopSliderMusic = false;
    }
  }

  changeDetect() {
    this.cd.detectChanges();
  }

}
