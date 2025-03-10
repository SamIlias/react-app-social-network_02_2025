import Users from "./Users";
import { connect } from "react-redux";
import {
  subscribeAC,
  unsubscribeAC,
  setUsersAC,
} from "../../redux/users-reducer";

const mapStateToProps = (state) => {
  return {
    usersList: state.usersPage.usersList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (userId) => {
      const action = subscribeAC(userId);
      dispatch(action);
    },
    unsubscribe: (userId) => {
      const action = unsubscribeAC(userId);
      dispatch(action);
    },
    setUsers: (usersList) => {
      const action = setUsersAC(usersList);
      dispatch(action);
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
