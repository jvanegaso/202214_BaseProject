export const validateEmail = (email) => {
  if (!email) {
    return false;
  }
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const hasValidLength = (value, maxLength) => {
  if (typeof value !== 'string') {
    return false;
  }
  return value.length <= maxLength;
};
