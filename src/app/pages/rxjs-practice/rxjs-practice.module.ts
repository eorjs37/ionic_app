import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RxjsPracticePageRoutingModule } from './rxjs-practice-routing.module';

import { RxjsPracticePage } from './rxjs-practice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RxjsPracticePageRoutingModule
  ],
  declarations: [RxjsPracticePage]
})
export class RxjsPracticePageModule {}
