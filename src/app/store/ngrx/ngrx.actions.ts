import { createAction, props } from '@ngrx/store';
import { Ngrx } from 'src/app/ngrx/ngrx.model';

export const loadNgrxs = createAction(
  '[Ngrx] Load Ngrxs'
);


export const retrievedNgrxList = createAction(
  '[Ngrx List/API] Retrive Ngrxs Sucess',
  props<{ ngrxs: ReadonlyArray<Ngrx>}>()
);


export const addNgrx = createAction(
  '[Ngrx Post/API] Add Ngrxs Success',
  props<{ngrxs: Ngrx}>()
)
