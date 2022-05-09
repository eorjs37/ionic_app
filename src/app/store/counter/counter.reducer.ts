import { createReducer,on } from "@ngrx/store";
import { increment, decrement , reset} from '@/app/store/counter/counter.actions';

export const initalState =0;

export const countReducer = createReducer(
    initalState,
    on(increment, (state) => state+1),
    on(decrement, (state) => state-1),
    on(reset, () => 0),
)