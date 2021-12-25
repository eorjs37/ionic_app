import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SliderState } from './slider.reducers';


export const selectSlider = createFeatureSelector<SliderState>('sliderState');

export const selectRecording = createSelector(
    selectSlider,
    (state: SliderState)=>state.recordingState
)