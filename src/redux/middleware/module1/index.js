import { getRequestEpic } from "../../actions/api";
import {
  getModule1,
  getModule1Success,
  getModule1Cancel,
} from "../../actions/module1";

import * as TYPE from "../../actions/module1/types";
import { url } from "../../../helpers";
import { showSpinner, hideSpinner } from "../../actions/ui";

const getSampleModuleFlow = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type === TYPE.GET_MODULE_1_EPIC) {
    dispatch([
      showSpinner(),
      getRequestEpic({
        url: url.posts,
        body: null,
        onCancel: getModule1Cancel,
        onSuccess: getModule1Success,
      }),
    ]);
  }
};

const getSampleModuleSuccessFlow = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type === TYPE.GET_MODULE_1_SUCCESS) {
    dispatch([getModule1(action.payload), hideSpinner()]);
  }
};

const getSampleModuleSuccessCancelFlow = ({ dispatch }) => (next) => (
  action
) => {
  next(action);

  if (action.type === TYPE.GET_MODULE_1_CANCEL) {
    dispatch(hideSpinner());
  }
};

export default [
  getSampleModuleFlow,
  getSampleModuleSuccessFlow,
  getSampleModuleSuccessCancelFlow,
];
