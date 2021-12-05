import { createAction, props } from '@ngrx/store';
import { Messages } from 'src/app/interface/messages';

export const loadMessages = createAction(
    '[Messages] Load Messages'
)

export const retrivedMessagesList = createAction(
    '[Messages] Load Messages',
    props<{ messages: ReadonlyArray<Messages>}>()
);

export const addMessage = createAction(
    '[Messages] Add Messages',
     props<{ message : Messages}>()
)