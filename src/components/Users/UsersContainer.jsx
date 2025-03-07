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
    // [{id: 1, imageURL: "", followed: false, fullName: 'Hexicus P.', status: "I am a boss", location: {city: "Molo", country: "Belarus"}}]
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
    setUsers: (users) => {
      const action = setUsersAC(users);
      dispatch(action);
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
