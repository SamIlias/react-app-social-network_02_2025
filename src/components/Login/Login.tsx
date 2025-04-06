import styles from "./Login.module.css";
import errorStyle from "../common/FormControl/FormControl.module.css";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormControl/FormControl";
import { maxLengthValidatorCreator, required } from "../../utils/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

const maxLength50 = maxLengthValidatorCreator(50);

// form -----------------------------------------------------
type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type OwnProps = {
  captchaUrl?: string;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType & OwnProps> & OwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField(styles.field, "email", "Email", Input, [
        required,
        maxLength50,
      ])}

      {createField(
        styles.field,
        "password",
        "Password",
        Input,
        [required, maxLength50],
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
          [required],
          {},
        )}

      <div>
        <button className={styles.loginButton}>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, OwnProps>({
  form: "loginForm",
})(LoginForm);

// Login component------------------------------------------------

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaUrl?: string;
};

type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl?: string;
};

type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captchaUrl?: string,
  ) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const Login: React.FC<PropsType> = ({ login, isAuth, captchaUrl }) => {
  const onSubmit = (formData: FormDataType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, { login })(Login);
