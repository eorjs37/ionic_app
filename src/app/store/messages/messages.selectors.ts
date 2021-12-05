import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Messages } from "src/app/interface/messages";

export const selectMessages = createFeatureSelector<ReadonlyArray<Messages>>('messages');