import LeftBar from "./LeftBar";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    items: state.leftBar.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const LeftbarContainer = connect(mapStateToProps, mapDispatchToProps)(LeftBar);

export default LeftbarContainer;
