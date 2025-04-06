export type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value: string) => {
  if (value) return undefined;

  return "field is required";
};

export const maxLengthValidatorCreator =
  (maxLength: number): ValidatorType =>
    (value: string) => {
      if (value.length > maxLength) return `max length is ${maxLength} symbols`;
      return undefined;
    };
