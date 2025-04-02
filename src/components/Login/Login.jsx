import styles from "./Login.module.css";
import errorStyle from "../common/FormControl/FormControl.module.css";
import { reduxForm } from "redux-form";
import { createField, Input } from "../common/FormControl/FormControl";
import { maxLengthValidatorCreator, requared } from "../../utils/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const maxLenght50 = maxLengthValidatorCreator(50);

// form -----------------------------------------------------
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField(styles.field, "email", "Email", Input, [
        requared,
        maxLenght50,
      ])}

      {createField(
        styles.field,
        "password",
        "Password",
        Input,
        [requared, maxLenght50],
        { type: "password" },
      )}

      {error && <div className={errorStyle.formSummaryError}>{error}</div>}

      {createField(
        styles.rememberMe,
        "rememberMe",
        null,
        Input,
        [],
        { type: "checkbox" },
        "remember me",
      )}

      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl &&
        createField(
          styles.field,
          "captchaUrl",
          "symbols from captcha",
          Input,
          [requared],
          {},
        )}

      <div>
        <button className={styles.loginButton}>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "loginForm" })(LoginForm);

// Login component------------------------------------------------
const Login = ({ login, isAuth, captchaUrl }) => {
  const onSubmit = (formData) => {
    login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captchaUrl,
    );
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
