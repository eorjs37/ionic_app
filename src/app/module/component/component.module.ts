import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from 'src/app/component/list/list.component';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ListComponent
  ]
})
export class ComponentModule { }
