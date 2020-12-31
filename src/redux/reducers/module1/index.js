import { handleActions } from "redux-actions";
import * as ACTION from "../../actions/module1";

const model = {
  candidatesCenterList: {
    pageSize: 10,
    pageCurrent: 0,
  },
  candidateStatus: [],
  auctionIdsAssignedToMe: [],
  candidateNamesByClient: [],
  keyword: "",
  module1List: [],
};

export default handleActions(
  {
    [ACTION.getModule1]: (state, action) => {
      return {
        ...state,
        module1List: action.payload,
      };
    },
    [ACTION.clearData]: (state, action) => ({
      ...state,
      module1List: [],
    }),
  },
  model
);
