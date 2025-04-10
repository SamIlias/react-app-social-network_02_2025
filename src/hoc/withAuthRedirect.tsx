import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component: any) => {
  const RedirectComponent = (props: any) => {
    if (!props.isAuth) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  const ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent,
  );

  return ConnectedRedirectComponent;
};
