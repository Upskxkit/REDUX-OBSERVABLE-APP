import { createAction } from "redux-actions";
import * as TYPE from "./types";

export const getModule1Epic = createAction(TYPE.GET_MODULE_1_EPIC);
export const getModule1Success = createAction(TYPE.GET_MODULE_1_SUCCESS);
export const getModule1Cancel = createAction(TYPE.GET_MODULE_1_CANCEL);
export const getModule1 = createAction(TYPE.GET_MODULE_1);

export const clearData = createAction(TYPE.CLEAR_DATA);
