import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
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
