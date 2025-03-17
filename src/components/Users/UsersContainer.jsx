import styles from "./Users.module.css";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { connect } from "react-redux";
import {
  subscribe,
  unsubscribe,
  setCurrentPage,
  getUsers,
} from "../../redux/users-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onChangePageNumber = (pageNumber) => {
    if (this.props.currentPage === pageNumber) {
      return;
    }
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <div className={styles.content}>
            <Preloader />
          </div>
        ) : null}

        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onChangePageNumber={this.onChangePageNumber}
          usersList={this.props.usersList}
          unsubscribe={this.props.unsubscribe}
          subscribe={this.props.subscribe}
          subscribingInProgress={this.props.subscribingInProgress}
        />
      </>
    );
  }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    subscribe,
    unsubscribe,
    setCurrentPage,
    getUsers,
  }),
)(UsersContainer);
