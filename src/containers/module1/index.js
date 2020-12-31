import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import View from "./View";
import * as actions from "../../redux/actions/module1";

function mapStateToProps(state) {
  return {
    isLoading: state.ui.isLoading,
    moduleList: state.module1.module1List,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reduxAction: bindActionCreators({ ...actions }, dispatch),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
