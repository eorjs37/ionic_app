import { createReducer, on } from '@ngrx/store';
import * as SliderActions from './slider.actions';

export interface SliderState{
    recordingState: Boolean
}

export const initialState: SliderState = {
    recordingState: false
}

export const sliderReducer = createReducer(
    initialState,
    on(SliderActions.recordingState, (state, { recordingState }) => ({
        ...state,
        recordingState: recordingState
    }))
)