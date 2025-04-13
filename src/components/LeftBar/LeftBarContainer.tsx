import { DispatchActionsType } from "../../redux/leftBar-reducer";
import { AppStateType } from "../../redux/redux-store";
import LeftBar from "./LeftBar";
import { connect } from "react-redux";

const mapStateToProps = (state: AppStateType) => {
  return {
    items: state.leftBar.items,
  };
};

const mapDispatchToProps = (dispatch: DispatchActionsType) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
