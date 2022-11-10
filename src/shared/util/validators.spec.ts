import {
  validateEmail,
  getRandomNumberInRange,
  falsyValidator,
  iterate,
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
