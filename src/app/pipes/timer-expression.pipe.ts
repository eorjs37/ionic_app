import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerExpression'
})
export class TimerExpressionPipe implements PipeTransform {

  transform(timer: number): string {
    let mm = Math.floor(timer/60) > 0 ? `0${timer/60}` : '00';
    let ss = timer % 60 >= 10 ? timer % 60 : `0${timer % 60}`;
    
    return `${mm} : ${ss}`;
  }

}
