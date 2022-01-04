import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerExpressionPipe } from './timer-expression.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimerExpressionPipe],
  exports: [
    TimerExpressionPipe
  ]
})
export class PipeModule { }
