import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { connect } from "react-redux";
import {
  subscribe,
  unsubscribe,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleSubscribingInProgress,
} from "../../redux/users-reducer";
// import axios from "axios";
import { usersAPI } from "../../api/api";

// const URL = "https://social-network.samuraijs.com/api/1.0/users";

const mapStateToProps = (state) => {
  return {
    usersList: state.usersPage.usersList,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    subscribingInProgress: state.usersPage.subscribingInProgress,
  };
};

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    usersAPI
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setTotalUsersCount(data.totalCount);
      });
  }

  onChangePageNumber = (pageNumber) => {
    if (this.props.currentPage === pageNumber) {
      return;
    }

    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);

    usersAPI
      .getUsers(this.props.currentPage, this.props.pageSize)
      .then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
      });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onChangePageNumber={this.onChangePageNumber}
          usersList={this.props.usersList}
          unsubscribe={this.props.unsubscribe}
          subscribe={this.props.subscribe}
          toggleSubscribingInProgress={this.props.toggleSubscribingInProgress}
          subscribingInProgress={this.props.subscribingInProgress}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, {
  subscribe,
  unsubscribe,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleSubscribingInProgress,
})(UsersContainer);
