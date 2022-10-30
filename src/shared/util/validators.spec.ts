import { validateEmail } from './validators';

describe('validateEmail', () => {
  it('should return null if not valid email', () => {
    expect(validateEmail('bad-email')).toBe(null);
  });

  it('should return false if there is no argument', () => {
    expect(validateEmail(null)).toBe(false);
  });

  it('should return an String object if a correct email is passed as argument', () => {
    const result = validateEmail('test@test.com');
    expect(result[0]).toBe('test@test.com');
  });
});
