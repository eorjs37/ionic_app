import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ngrx } from 'src/app/ngrx/ngrx.model';

export const selectNgrxs = createFeatureSelector<ReadonlyArray<Ngrx>>('ngrxs');