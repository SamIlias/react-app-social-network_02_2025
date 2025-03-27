import { Field } from "redux-form";
import styles from "./FormControl.module.css";

export const Textarea = ({ input, meta, ...props }) => {
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

export const Input = ({ input, meta, ...props }) => {
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
  className,
  name,
  placeholder,
  component,
  validators = [],
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
