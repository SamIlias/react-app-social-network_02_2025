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
} from "../../redux/users-reducer";
import axios from "axios";

const URL = "https://social-network.samuraijs.com/api/1.0/users";

const mapStateToProps = (state) => {
  return {
    usersList: state.usersPage.usersList,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  };
};

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get(`${URL}?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  onChangePageNumber = (pageNumber) => {
    if (this.props.currentPage === pageNumber) {
      return;
    }

    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    axios
      .get(`${URL}?page=${pageNumber}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
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
})(UsersContainer);
