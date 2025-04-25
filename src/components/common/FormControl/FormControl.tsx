import { Field, WrappedFieldProps } from "redux-form";
import styles from "./FormControl.module.css";
import { ValidatorType } from "../../../utils/validators";

export const Textarea: React.FC<WrappedFieldProps> = ({
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

export const Input: React.FC<WrappedFieldProps> = ({
  input,
  meta,
  ...props
}) => {
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

export function createField<FormKeysType extends string>(
  className: string | null,
  name: FormKeysType,
  placeholder: string | null,
  component: React.FC<WrappedFieldProps>,
  validators = [] as Array<ValidatorType>,
  props = {},
  text = "" as string | null | undefined,
) {
  return (
    <div>
      <Field
        className={className}
        placeholder={placeholder}
        name={name}
        component={component}
        validate={validators}
        value={text}
        {...props}
      />
    </div>
  );
}
