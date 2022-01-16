import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private $stopSubject = new Subject();
  constructor() { }

  /**
   * @description : startTimer
   */
  startTimer(): Observable<number> {
    return timer(0, 1000).pipe(
      takeUntil(this.$stopSubject)
    )
  }

  /**
   * @description : stopTimer
   */
  stopTimer() {
    this.$stopSubject.next(true);
  }
}
