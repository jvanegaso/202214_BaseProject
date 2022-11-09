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

export const getRandomNumberInRange = (lower = 0, upper = 10) => {
  if (isNaN(lower) || isNaN(upper)) {
    console.error("lower and upper must be valid numbers")
    return
  }
  lower = Math.ceil(lower)
  upper = Math.floor(upper)
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}

export const removeDuplicates = (arr) => {
  if (!Array.isArray(arr)) {
    console.error(`array expected, ${typeof arr} provided`)
    return
  }
  return [...new Set(arr)]
}

export const camelToSnakeCase = (text) => {
  if (!(typeof text == "string" || text instanceof String)) {
    console.error(`string expected, ${typeof text} provided`)
    return text
  }
  return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

export const camelToSnakeCase = (text) => {
  if (!(typeof text == "string" || text instanceof String)) {
    console.error(`string expected, ${typeof text} provided`)
    return text
  }
  return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

export const isDateValid => (date) {
    return !Number.isNaN(date.getTime());
}

export const findIndex = (arr, func) => {
  for (let index = 0; index < arr.length; index++) {
    if (func.call(this, arr[index], index)) {
      return index;
    }
  }

  return undefined;
};


export const findIndex = (arr, func) => {
  for (let index = 0; index < arr.length; index++) {
    if (func.call(this, arr[index], index)) {
      return index;
    }
  }
  return undefined;
};

export const findIndex = (arr, func) => {
  for (let index = 0; index < arr.length; index++) {
    if (func.call(this, arr[index], index)) {
      return index;
    }
  }
  return undefined;
};

