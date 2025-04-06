import { Field, WrappedFieldProps } from "redux-form";
import styles from "./FormControl.module.css";
import { ValidatorType } from "../../../utils/validators";

type TextareaProps = WrappedFieldProps;
// & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({
  input,
  meta,
  ...props
}) => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Input: React.FC<TextareaProps> = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
      <div>
        <input {...input} {...props} />
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const createField = (
  className: string | null,
  name: string,
  placeholder: string | null,
  component: React.FC<WrappedFieldProps>,
  validators = [] as Array<ValidatorType>,
  props = {},
  text = "",
) => {
  return (
    <div>
      <Field
        className={className}
        placeholder={placeholder}
        name={name}
        component={component}
        validate={validators}
        {...props}
      />{" "}
      {text}
    </div>
  );
};
