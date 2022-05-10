import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RxjsPracticePage } from './rxjs-practice.page';

const routes: Routes = [
  {
    path: '',
    component: RxjsPracticePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsPracticePageRoutingModule {}
