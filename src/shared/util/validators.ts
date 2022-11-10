import { randomInt } from 'mathjs';
import * as isEmail from 'isemail';

export const validateEmail = (email) => {
  if (!email) {
    return false;
  }

  if (!isEmail.validate(email)) {
    return null;
  }
  return email;
};

export const hasValidLength = (value, maxLength) => {
  if (typeof value !== 'string') {
    return false;
  }
  return value.length <= maxLength;
};

export const getRandomNumberInRange = (lower = 0, upper = 10) => {
  if (isNaN(lower) || isNaN(upper)) {
    return;
  }
  return randomInt(lower, upper);
};

export const removeDuplicates = (arr) => {
  if (!Array.isArray(arr)) {
    console.error(`array expected, ${typeof arr} provided`);
    return;
  }
  return [...new Set(arr)];
};

export const camelToSnakeCase = (text) => {
  if (!(typeof text == 'string' || text instanceof String)) {
    console.error(`string expected, ${typeof text} provided`);
    return text;
  }
  return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const findIndex = (arr, func) => {
  for (let index = 0; index < arr.length; index++) {
    if (func.call(this, arr[index], index)) {
      return index;
    }
  }

  return undefined;
};

export const WrongFunction = (a, b) => {
  return a == b;
};

export const iterate = (elements) => {
  if (!Array.isArray(elements)) {
    return false;
  }
  return elements.reduce((p, c) => {
    return (p += c);
  }, 0);
};

export const mockExceptionFunction = () => {
  const nullArray = null;
  for (let i = 0; i < nullArray.lenght; i++) {
    console.log('Array en ' + i + ' es: ' + nullArray[i]);
  }
};

export const falsyValidator = (param = NaN) => {
  if (Number.isNaN(param)) {
    // Noncompliant; always false
    console.log('a is not a number'); // this is dead code
    return 0;
  }
  if (!Number.isNaN(param)) {
    // Noncompliant; always true
    console.log('a is not NaN'); // this statement is not necessarily true
  }
  return param;
};
