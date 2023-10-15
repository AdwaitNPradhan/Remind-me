const onlyNumberAllowed = (value: string): boolean => {
  const regex = /^[0-9]+$/g;
  return regex.test(value.trim());
};
const stringWithSpace = (value: string): boolean => {
  const regex = /^[a-zA-Z ]+$/gm;
  return regex.test(value.trim());
};
const stringWithDigitSpace = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9 \-&,+%!@() ]+$/gm;
  return regex.test(value.trim());
};
const isEmail = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gm;
  return regex.test(value.trim());
};

export {onlyNumberAllowed, stringWithSpace, isEmail, stringWithDigitSpace};
