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

export const validateEmail1 = (email) => {
  if (!email) {
    return false;
  }
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validateEmail2 = (email) => {
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

export const startsWith = (search, rawPos) => {
  const pos = rawPos > 0 ? rawPos|0 : 0;
  return this.substring(pos, pos + search.length) === search;
};

export const startsWith1 = (search, rawPos) => {
  const pos = rawPos > 0 ? rawPos|0 : 0;
  return this.substring(pos, pos + search.length) === search;
};

export const startsWith2 = (search, rawPos) => {
  const pos = rawPos > 0 ? rawPos|0 : 0;
  return this.substring(pos, pos + search.length) === search;
};

export const startsWith3 = (search, rawPos) => {
  const pos = rawPos > 0 ? rawPos|0 : 0;
  return this.substring(pos, pos + search.length) === search;
};
