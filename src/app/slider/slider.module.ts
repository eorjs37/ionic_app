import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SliderPageRoutingModule } from './slider-routing.module';

import { SliderPage } from './slider.page';
import { PipesModule } from '../module/pipes/pipes.module';
import { Slider1Component } from './component/slider1/slider1.component';
import { StoreModule } from '@ngrx/store';
import * as fromSliderReducer from './state/slider.reducers';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SliderPageRoutingModule,
    PipesModule,
    StoreModule.forFeature('sliderState',fromSliderReducer.sliderReducer)
  ],
  declarations: [SliderPage, Slider1Component],
  exports:[Slider1Component]
})
export class SliderPageModule {}