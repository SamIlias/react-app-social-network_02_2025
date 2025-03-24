import styles from "./Users.module.css";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { connect } from "react-redux";
import {
  subscribe,
  unsubscribe,
  setCurrentPage,
  requestUsers,
} from "../../redux/users-reducer";
import { compose } from "redux";
import {
  getUsers,
  getTotalUsersCount,
  getPageSize,
  getCurrentPage,
  getIsFetching,
  getSubscribingInProgress,
  getToken,
} from "../../redux/users-selectors";

const mapStateToProps = (state) => {
  return {
    usersList: getUsers(state),
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    subscribingInProgress: getSubscribingInProgress(state),
    token: getToken(state),
  };
};

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onChangePageNumber = (pageNumber) => {
    if (this.props.currentPage === pageNumber) {
      return;
    }
    this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  };

  render() {
    if (this.props.isFetching) {
      return <Preloader className={styles.content} />;
    }

    return (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onChangePageNumber={this.onChangePageNumber}
        usersList={this.props.usersList}
        unsubscribe={this.props.unsubscribe}
        subscribe={this.props.subscribe}
        subscribingInProgress={this.props.subscribingInProgress}
        token={this.props.token}
      />
    );
  }
}

export default compose(
  connect(mapStateToProps, {
    subscribe,
    unsubscribe,
    setCurrentPage,
    requestUsers,
  }),
)(UsersContainer);
