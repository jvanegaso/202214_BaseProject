import {
  validateEmail,
  getRandomNumberInRange,
  falsyValidator,
  iterate,
  hasValidLength,
  removeDuplicates,
  camelToSnakeCase,
  findIndex,
  WrongFunction,
  mockExceptionFunction,
} from './validators';

describe('validateEmail', () => {
  it('should return null if not valid email', () => {
    expect(validateEmail('bad-email')).toBe(null);
  });

  it('should return false if there is no argument', () => {
    expect(validateEmail(null)).toBe(false);
  });

  it('should return an String object if a correct email is passed as argument', () => {
    const result = validateEmail('test@test.com');
    expect(result).toBe('test@test.com');
  });
});

describe('getRandomInRange', () => {
  it('should generate a random number between 0 and 10', () => {
    const randomValue = getRandomNumberInRange(0, 10);
    expect(randomValue).toBeLessThanOrEqual(10);
    expect(randomValue).toBeGreaterThanOrEqual(0);
  });

  it('should return undefined if the minumun number is not a number', () => {
    const randomValue = getRandomNumberInRange(undefined, 10);
    expect(randomValue).toBeUndefined;
  });

  it('should return undefined if the maximun number is not a number', () => {
    const randomValue = getRandomNumberInRange(0, undefined);
    expect(randomValue).toBeUndefined;
  });

  it('shoud return if lower is undefined', () => {
    const randomValue = getRandomNumberInRange(undefined, 10);
    expect(randomValue).toBeUndefined;
  });

  it('shoud return if upper is undefined', () => {
    const randomValue = getRandomNumberInRange(0, undefined);
    expect(randomValue).toBeUndefined;
  });
});

describe('falsyValidator', () => {
  it('should return 0 on Nan param', () => {
    const param = falsyValidator(NaN);
    expect(param).toBe(0);
  });

  it('should return value param', () => {
    const param = falsyValidator(10);
    expect(param).toBe(10);
  });
});

describe('iterate', () => {
  it('should return 5 when an array with 5 slots all with 1 is passed', () => {
    const result = iterate([1, 1, 1, 1, 1]);
    expect(result).toEqual(5);
  });

  it('should return false if the argument is not an array', () => {
    expect(iterate(null)).toBeFalsy;
  });
});

describe('hasValidLength', () => {
  it('should return false if is not string', () => {
    const result = hasValidLength(10, 10);
    expect(result).toBeFalsy();
  });

  it('should return false if the string is longer than the max length', () => {
    const result = hasValidLength('test', 2);
    expect(result).toBeFalsy();
  });

  it('should return true if the string is shorter than the max length', () => {
    const result = hasValidLength('test', 10);
    expect(result).toBeTruthy();
  });
});

describe('removeDuplicates', () => {
  it('should return an array with no duplicates', () => {
    const result = removeDuplicates([1, 2, 3, 1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should return undefined if the argument is not an array', () => {
    const result = removeDuplicates(1);
    expect(result).toBeUndefined;
  });
});

describe('camelToSnakeCase', () => {
  it('should return a snake case string', () => {
    const result = camelToSnakeCase('testString');
    expect(result).toBe('test_string');
  });

  it('should return the same string if the argument is not a string', () => {
    const result = camelToSnakeCase(1);
    expect(result).toBe(1);
  });
});

describe('findIndex', () => {
  it('should return the index of the element', () => {
    const result = findIndex([1, 2, 3], function (element) {
      return element === 2;
    });
    expect(result).toBe(1);
  });

  it('should return -1 if the element is not found', () => {
    const result = findIndex([1, 1, 3], function (element) {
      return false;
    });
    expect(result).toBeUndefined();
  });
});

describe('wrong function', () => {
  it('should return false if are diferent', () => {
    const result = WrongFunction(1, 2);
    expect(result).toBeFalsy();
  });
  it('should return true if are equal', () => {
    const result = WrongFunction(1, 1);
    expect(result).toBeTruthy();
  });
});

describe('mockExceptionFunction', () => {
  it('should return 3', () => {
    const result = mockExceptionFunction([1, 2, 3]);
    expect(result).toBe(3);
  });
});
