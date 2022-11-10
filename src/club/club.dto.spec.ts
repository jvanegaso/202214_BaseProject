import { plainToInstance } from 'class-transformer';
import { ClubDTO } from './club.dto';
import { validate } from 'class-validator';

describe('ClubService', () => {
  it('should throw when name is empty', async () => {
    const clubInfo = { name: '' };
    const clubDto = plainToInstance(ClubDTO, clubInfo);
    const errors = await validate(clubDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`name should not be empty`);
  });

  it('should throw when foundation is empty', async () => {
    const clubInfo = { foundation: '' };
    const clubDto = plainToInstance(ClubDTO, clubInfo);
    const errors = await validate(clubDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`foundation should not be empty`);
  });

  it('should throw when image is empty', async () => {
    const clubInfo = { image: '' };
    const clubDto = plainToInstance(ClubDTO, clubInfo);
    const errors = await validate(clubDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`image should not be empty`);
  });

  it('should throw when description is empty', async () => {
    const clubInfo = { description: '' };
    const clubDto = plainToInstance(ClubDTO, clubInfo);
    const errors = await validate(clubDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`description should not be empty`);
  });

  it('should throw when name is not string', async () => {
    const clubInfo = { name: 1 };
    const clubDto = plainToInstance(ClubDTO, clubInfo);
    const errors = await validate(clubDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`name must be a string`);
  });

  it('should throw when foundation is not string', async () => {
    const clubInfo = { foundation: 1 };
    const clubDto = plainToInstance(ClubDTO, clubInfo);
    const errors = await validate(clubDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`foundation must be a string`);
  });

  it('should throw when image is not string', async () => {
    const clubInfo = { image: 1 };
    const clubDto = plainToInstance(ClubDTO, clubInfo);
    const errors = await validate(clubDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`image must be a string`);
  });

  it('should throw when description is not string', async () => {
    const clubInfo = { description: 1 };
    const clubDto = plainToInstance(ClubDTO, clubInfo);
    const errors = await validate(clubDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`description must be a string`);
  });
});
