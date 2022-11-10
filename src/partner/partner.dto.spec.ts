import { plainToInstance } from 'class-transformer';
import { PartnerDTO } from './partner.dto';
import { validate } from 'class-validator';

describe('ClubService', () => {
  it('should throw when name is empty', async () => {
    const partnerInfo = { name: '' };
    const partnerDto = plainToInstance(PartnerDTO, partnerInfo);
    const errors = await validate(partnerDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`name should not be empty`);
  });

  it('should throw when birthday is empty', async () => {
    const partnerInfo = { birthday: '' };
    const partnerDto = plainToInstance(PartnerDTO, partnerInfo);
    const errors = await validate(partnerDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`birthday should not be empty`);
  });

  it('should throw when email is empty', async () => {
    const partnerInfo = { email: '' };
    const partnerDto = plainToInstance(PartnerDTO, partnerInfo);
    const errors = await validate(partnerDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`email should not be empty`);
  });

  it('should throw when name is not string', async () => {
    const partnerInfo = { name: 1 };
    const partnerDto = plainToInstance(PartnerDTO, partnerInfo);
    const errors = await validate(partnerDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`name must be a string`);
  });

  it('should throw when foundation is not string', async () => {
    const partnerInfo = { birthday: 1 };
    const partnerDto = plainToInstance(PartnerDTO, partnerInfo);
    const errors = await validate(partnerDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`birthday must be a string`);
  });

  it('should throw when email is not string', async () => {
    const partnerInfo = { email: 1 };
    const partnerDto = plainToInstance(PartnerDTO, partnerInfo);
    const errors = await validate(partnerDto, { skipMissingProperties: true });
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`email must be a string`);
  });
});
