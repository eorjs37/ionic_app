import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgrxPageRoutingModule } from './ngrx-routing.module';

import { NgrxPage } from './ngrx.page';
import { ComponentModule } from '../module/component/component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgrxPageRoutingModule,
    ComponentModule
  ],
  declarations: [NgrxPage]
})
export class NgrxPageModule {}
