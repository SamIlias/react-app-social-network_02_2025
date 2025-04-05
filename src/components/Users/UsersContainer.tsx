import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { connect } from "react-redux";
import {
  subscribe,
  unsubscribe,
  setCurrentPage,
  requestUsers,
  UserType,
} from "../../redux/users-reducer";
import { compose } from "redux";
import {
  getTotalUsersCount,
  getPageSize,
  getCurrentPage,
  getIsFetching,
  getSubscribingInProgress,
  getToken,
  getUsersSuper,
} from "../../redux/users-selectors";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  totalUsersCount: number;
  currentPage: number;
  pageSize?: number;
  portionSize?: number;
  usersList: Array<UserType>;
  subscribingInProgress: Array<number>;
  token: string | null;
  isFetching: boolean;
};

type MapDispatchPropsType = {
  unsubscribe: (userId: number, token: string | null) => void;
  subscribe: (userId: number, token: string | null) => void;
  requestUsers: (currentPage: number, pageSize?: number) => void;
  setCurrentPage: (pageNumber: number) => void;
};

type OwnPropsType = {
  pageTitle?: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    usersList: getUsersSuper(state),
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    subscribingInProgress: getSubscribingInProgress(state),
    token: getToken(state),
  };
};

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onChangePageNumber = (pageNumber: number) => {
    if (this.props.currentPage === pageNumber) {
      return;
    }
    this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };

  render() {
    if (this.props.isFetching) {
      return <Preloader />;
    }

    return (
      <>
        <h1>this.props.pageTitle</h1>
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
      </>
    );
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      subscribe,
      unsubscribe,
      setCurrentPage,
      requestUsers,
    },
  ),
)(UsersContainer);
