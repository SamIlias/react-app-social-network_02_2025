export const requared = (value) => {
  if (value) return undefined;

  return "field is requared";
};

export const maxLengthValidatorCrerator = (maxLength) => (value) => {
  if (value.length > maxLength) return `max length is ${maxLength} symbols`;
  return undefined;
};
