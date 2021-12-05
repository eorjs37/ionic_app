import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides,IonContent } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
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
  slideOpts = {
    initialSlide: 0,
    speed: 200,
    autoHeight: true,
    onInit: () => {
      
    }
  };
  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  async slideChanged() {
    const idx = await this.slides.getActiveIndex();
    if (idx === 0) {
      this.stopSliderMusic = true;
    } else {
      this.stopSliderMusic = false;
    }
    
  }

}
