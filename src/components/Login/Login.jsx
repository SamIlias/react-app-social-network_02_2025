import s from "./Login.module.css";
import errorStyle from "../common/FormControl/FormControl.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormControl/FormControl";
import { maxLengthValidatorCrerator, requared } from "../../utils/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const maxLenght50 = maxLengthValidatorCrerator(50);

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          className={s.login}
          placeholder={"Email"}
          name={"email"}
          component={Input}
          validate={[requared, maxLenght50]}
        />
      </div>
      <div>
        <Field
          className={s.password}
          placeholder={"Password"}
          type={"password"}
          name={"password"}
          component={Input}
          validate={[requared, maxLenght50]}
        />
      </div>
      {props.error && (
        <div className={errorStyle.formSummaryError}>{props.error}</div>
      )}
      <div>
        <Field
          className={s.rememberMe}
          type={"checkbox"}
          name={"rememberMe"}
          component={Input}
        />
        remeberMe
      </div>
      <div>
        <button className={s.loginButton}>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "loginForm" })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
