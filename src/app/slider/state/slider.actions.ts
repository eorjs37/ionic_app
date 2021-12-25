import { createAction, props } from '@ngrx/store';

export const recordingState = createAction(
    '[Slider1] Set recording State',
    props<{recordingState: Boolean}>()
)