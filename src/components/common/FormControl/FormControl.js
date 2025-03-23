import styles from "./FormControl.module.css";

// const FormControl = ({ input, meta, children, ...props }) => {
//   const hasError = meta.touched && meta.error;
//
//   return (
//     <div className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
//       <div>{children}</div>
//       {hasError && <span>{meta.error}</span>}
//     </div>
//   );
// };
//
// export const Textarea = ({ input, meta, ...props }) => {
//   return (
//     <FormControl {...props}>
//       <textarea {...input} {...props}></textarea>
//     </FormControl>
//   );
// };
//
// export const Input = ({ input, meta, ...props }) => {
//   return (
//     <FormControl {...props}>
//       <input {...input} {...props}></input>
//     </FormControl>
//   );
// };
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
