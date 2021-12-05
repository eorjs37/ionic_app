import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectNgrxs } from '../store/ngrx/ngrx.selectors';
import { retrievedNgrxList, addNgrx } from '../store/ngrx/ngrx.actions';
import { NgrxApiService } from './ngrx-api.service';
import { Ngrx } from './ngrx.model';
@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.page.html',
  styleUrls: ['./ngrx.page.scss'],
})
export class NgrxPage implements OnInit {
  ngrxs$ = this.store.select(selectNgrxs);
  visible: boolean;
  child: string;
  constructor( private ngrxApiService: NgrxApiService,
               private store: Store) {
    this.visible = false;
    this.child = "1";
  }

  ngOnInit() {
    this.ngrxApiService.getNgrxs().subscribe((ngrxs) =>{
      this.store.dispatch(retrievedNgrxList({ ngrxs }));
    });
  }

  add() {
    const ngrxs = {
      id: "1",
      volumeInfo: {
        title: "22",
        authors : ["1","2","3"]
      }
    }
    this.store.dispatch(addNgrx({ngrxs}));
  }

  show() {
    this.visible = !this.visible;
  }

  childAdd(childItem: number) {
    console.log('childItem : ', childItem);
  }

  childPlus() {
    this.child = "33";
  }
}
