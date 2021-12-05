import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgrxPage } from './ngrx.page';

const routes: Routes = [
  {
    path: '',
    component: NgrxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgrxPageRoutingModule {}
