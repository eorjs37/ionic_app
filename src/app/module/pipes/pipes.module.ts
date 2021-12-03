import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExponentialStrengthPipe } from 'src/app/pipe/exponential-strength.pipe';
import { PipePipe } from 'src/app/pipe/pipe.pipe';

@NgModule({
  declarations: [
    ExponentialStrengthPipe,
    PipePipe
  ],
  exports: [
    ExponentialStrengthPipe,
    PipePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
