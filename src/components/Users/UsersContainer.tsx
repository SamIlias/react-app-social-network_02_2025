import React from "react";
import { Users } from "./Users";
import Preloader from "../common/Preloader";
import { useSelector } from "react-redux";
import { getIsFetching } from "../../redux/users-selectors";

type OwnPropsType = {
  pageTitle?: string;
};

export const UsersPage: React.FC<OwnPropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      <h1>{props.pageTitle}</h1>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
