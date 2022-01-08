import { createReducer, on } from '@ngrx/store';
import * as SliderActions from './slider.actions';

export interface SliderState{
    recordingState: Boolean,
    mySpeak: Array<string>
}

export const initialState: SliderState = {
    recordingState: false,
    mySpeak:[]
}

export const sliderReducer = createReducer(
    initialState,
    on(SliderActions.recordingState, (state, { recordingState }) => ({
        ...state,
        recordingState: recordingState
    })),
    on(SliderActions.addMySpeakState, (state, { matche }) => ({
        ...state,
        mySpeak: [...state.mySpeak, matche]
    }))
)