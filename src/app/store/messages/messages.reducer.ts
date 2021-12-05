import { createReducer, on } from '@ngrx/store';
import { Messages } from 'src/app/interface/messages';
import { retrivedMessagesList,addMessage } from './messages.action';

export const initialState: ReadonlyArray<Messages> = [];

export const messagesReducer = createReducer(
    initialState,
    on(retrivedMessagesList, (state, { messages }) => messages),
    on(addMessage, (state, { message }) => {
        return [...state, message];
    })
)