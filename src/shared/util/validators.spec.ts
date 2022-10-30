import { validateEmail } from './validators';

describe('validateEmail', () => {
  it('should return false if not valid email', () => {
    expect(validateEmail('bad-email')).toBe(null);
  });
});
