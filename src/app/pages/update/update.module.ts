import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePageRoutingModule } from './update-routing.module';

import { UpdatePage } from './update.page';


// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePageRoutingModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 2,
      innerStrokeWidth: 2,
      outerStrokeColor: "#808080",
      innerStrokeColor: "#e7e8ea",
      animationDuration: 1000,
      showInnerStroke: true,
      space: -2,
      startFromZero: false
    })
  ],
  declarations: [UpdatePage]
})
export class UpdatePageModule { }
