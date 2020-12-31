import PropTypes from "prop-types";

export const propTypes = {
  reduxAction: PropTypes.object.isRequired,
  sampleModuleList: PropTypes.array,
  isLoading: PropTypes.bool
};

export const defaultProps = {
  sampleModuleList: [],
  isLoading: []
};