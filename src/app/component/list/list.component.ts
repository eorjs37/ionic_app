import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ngrx } from 'src/app/ngrx/ngrx.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input()
  items: ReadonlyArray<Ngrx>;
  @Input()
  test: string;
  @Output() parentAdd = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  newAdd() {
    this.parentAdd.emit(1);
  }

  log() {
    console.log('test : ', this.test);
  }
}
