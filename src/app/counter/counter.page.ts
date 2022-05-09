import { Component, OnInit } from '@angular/core';
import { increment, decrement, reset } from '@/app/store/counter/counter.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit {
  count$: Observable<number>;
  constructor(private store: Store<{count:number}>) { 
    this.count$ = this.store.select('count');
  }

  ngOnInit() {
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement(){
    this.store.dispatch(decrement());
  }

  reset(){
    this.store.dispatch(reset());
  }

}
