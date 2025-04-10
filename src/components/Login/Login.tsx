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

// Types ------------------------------------------------------
type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaURL?: string;
};

type MapStatePropsType = {
  isAuth: boolean;
  captchaURL?: string;
};

type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captchaURL?: string,
  ) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaURL?: string;
};

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

type OwnProps = {
  captchaURL?: string;
};

// form -----------------------------------------------------
const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, OwnProps> & OwnProps
> = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>(
        styles.field,
        "email",
        "Email",
        Input,
        [required, maxLength50],
      )}

      {createField<LoginFormValuesTypeKeys>(
        styles.field,
        "password",
        "Password",
        Input,
        [required, maxLength50],
        { type: "password" },
      )}

      {error && <div className={errorStyle.formSummaryError}>{error}</div>}

      {createField<LoginFormValuesTypeKeys>(
        styles.rememberMe,
        "rememberMe",
        null,
        Input,
        [],
        { type: "checkbox" },
        "remember me",
      )}

      {captchaURL && <img src={captchaURL} alt="" />}
      {captchaURL &&
        createField<LoginFormValuesTypeKeys>(
          styles.field,
          "captchaURL",
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
const Login: React.FC<PropsType> = ({ login, isAuth, captchaURL }) => {
  const onSubmit = (formData: FormDataType) => {
    login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captchaURL,
    );
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaURL: state.auth.captchaURL,
  isAuth: state.auth.isAuth,
});

export default connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, { login })(Login);
