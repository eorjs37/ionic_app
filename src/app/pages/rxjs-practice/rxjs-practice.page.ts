import { Component, OnInit } from '@angular/core';
import { from, fromEvent,interval,of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-practice',
  templateUrl: './rxjs-practice.page.html',
  styleUrls: ['./rxjs-practice.page.scss'],
})
export class RxjsPracticePage implements OnInit {

  constructor() { }

  ngOnInit() {
    //from
    this.getFrom().subscribe(v=>{
      console.log(`v : ` , v);
    });

    //fromevent
    this.getFromEvent();

    //mergeMap
    this.getMergeMap();
  }

  /**
   * 
   * @description : from
   */
  getFrom(){
    return from([1,2,3])
      .pipe(
          map(v => v+1)
      );
  }

  /**
   * @description : fromEvent
   */
  getFromEvent(){
    const input = document.getElementById('btn');
    const click$ = fromEvent(input,'click');
    click$.subscribe(console.log);
  }

  /**
   * @description : mergeMap
   */
  getMergeMap(){
    const letters = of('상급복숭아','중급복숭아','하급복숭아');
    const results = letters.pipe(
      mergeMap(
        x => interval(1000).pipe(map(i => `${x}통조림${i} 세트`))
      )
    );
    results.subscribe(x => console.log(x));
  }

}
