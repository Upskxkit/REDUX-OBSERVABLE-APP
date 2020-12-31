import { handleActions } from "redux-actions";
import * as ACTION from "../../actions/ui";

const model = {
  isLoading: false,
};

export default handleActions(
  {
    [ACTION.showSpinner]: (state) => {
      console.log("show spinner count");
      return {
        ...state,
        isLoading: true,
      };
    },
    [ACTION.hideSpinner]: (state) => {
      console.log("hide spinner count");
      return {
        ...state,
        isLoading: false,
      };
    },
  },
  model
);
