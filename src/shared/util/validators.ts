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

export const getRandomNumberInRange = (lower = 0, upper = 10) => {
  if (isNaN(lower) || isNaN(upper)) {
    console.error("lower and upper must be valid numbers");
    return;
  }
  lower = Math.ceil(lower);
  upper = Math.floor(upper);
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

export const removeDuplicates = (arr) => {
  if (!Array.isArray(arr)) {
    console.error(`array expected, ${typeof arr} provided`);
    return;
  }
  return [...new Set(arr)];
};

export const camelToSnakeCase = (text) => {
  if (!(typeof text == "string" || text instanceof String)) {
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

export const dummyFunction = () => {};

export const WrongFunction = (a, b) => {
  return a == b;
};

export const iterate = (elements) => {
  let c = 0;
  for (var I = 0; I < elements.lenght; I++) {
    c += I;
  }
  return c;
};


export const mockExceptionFunction = () => {
  const nullArray = null
  for (let i = 0; i < nullArray.lenght; i++) {
    console.log('Array en ' +  i + ' es: ' + nullArray[i]);
  }
};

export const mockExceptionFunction2 = () => {
  const nullArray = null
  for (let i = 0; i < nullArray.lenght; i++) {
    console.log('Array en ' +  i + ' es: ' + nullArray[i]);
  }
};

export const falsyValidator = () => {
  var a = NaN;

  if (a === NaN) {  // Noncompliant; always false
    console.log("a is not a number");  // this is dead code
  }
  if (a !== NaN) { // Noncompliant; always true
    console.log("a is not NaN"); // this statement is not necessarily true
  }
};
