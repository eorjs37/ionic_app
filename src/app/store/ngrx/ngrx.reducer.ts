import { createReducer, on } from '@ngrx/store';
import { retrievedNgrxList, addNgrx } from './ngrx.actions';
import { Ngrx } from 'src/app/ngrx/ngrx.model';
export const ngrxFeatureKey = 'ngrx';

export interface State {

}

export const initialState: ReadonlyArray<Ngrx> = [];


export const ngrxReducer = createReducer(
  initialState,
  on(retrievedNgrxList, (state, { ngrxs }) => ngrxs),
  on(addNgrx, (state, { ngrxs }) => {
    return [...state, ngrxs]
  })
);

