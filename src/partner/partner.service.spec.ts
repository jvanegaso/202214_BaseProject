import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { PartnerEntity } from './partner.entity';
import { PartnerService } from './partner.service';
import { faker } from '@faker-js/faker';

const mockPartner = () => {
  const mockedPartner: PartnerEntity = new PartnerEntity();
  mockedPartner.name = faker.name.fullName();
  mockedPartner.email = faker.internet.email();
  mockedPartner.birthdate = faker.date.birthdate();
  mockedPartner.clubs = [];
  return mockedPartner;
};

describe('PartnerService', () => {
  let service: PartnerService;
  let repository: Repository<PartnerEntity>;
  let partnersList: PartnerEntity[];

  const seedDatabase = async () => {
    repository.clear();
    partnersList = [];
    for (let i = 0; i < 5; i++) {
      const partner: PartnerEntity = await repository.save(mockPartner());
      partnersList.push(partner);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PartnerService],
    }).compile();

    service = module.get<PartnerService>(PartnerService);
    repository = module.get<Repository<PartnerEntity>>(
      getRepositoryToken(PartnerEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all partners', async () => {
    const partners: PartnerEntity[] = await service.findAll();
    expect(partners).not.toBeNull();
    expect(partners).toHaveLength(partnersList.length);
  });

  it('findOne should return a partner by id', async () => {
    const storedPartner: PartnerEntity = partnersList[0];
    const partner: PartnerEntity = await service.findOne(storedPartner.id);
    expect(partner).not.toBeNull();
    expect(partner.name).toEqual(storedPartner.name);
    expect(partner.birthdate).toEqual(storedPartner.birthdate);
    expect(partner.email).toEqual(storedPartner.email);
  });

  it('findOne should throw an exception for an invalid partner', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });

  it('create should return a new partner', async () => {
    const partner: PartnerEntity = mockPartner();
    const newPartner: PartnerEntity = await service.create(partner);
    expect(newPartner).not.toBeNull();

    const storedPartner: PartnerEntity = await repository.findOne({
      where: { id: newPartner.id },
    });
    expect(storedPartner).not.toBeNull();
    expect(storedPartner.name).toEqual(newPartner.name);
    expect(storedPartner.birthdate).toEqual(newPartner.birthdate);
    expect(storedPartner.email).toEqual(newPartner.email);
  });

  it('create should throw an exception for an invalid email', async () => {
    const partner: PartnerEntity = mockPartner();
    partner.email = 'invalid';
    await expect(() => service.create(partner)).rejects.toHaveProperty(
      'message',
      'The email address is invalid',
    );
  });

  it('update should modify a partner', async () => {
    const partner: PartnerEntity = { ...partnersList[0], ...mockPartner() };
    const updatedPartner: PartnerEntity = await service.update(
      partner.id,
      partner,
    );
    expect(updatedPartner).not.toBeNull();
    const storedPartner: PartnerEntity = await repository.findOne({
      where: { id: partner.id },
    });
    expect(storedPartner).not.toBeNull();
    expect(storedPartner.name).toEqual(updatedPartner.name);
    expect(storedPartner.birthdate).toEqual(updatedPartner.birthdate);
    expect(storedPartner.email).toEqual(updatedPartner.email);
  });

  it('update should throw an exception for an invalid email', async () => {
    const partner: PartnerEntity = { ...partnersList[0], ...mockPartner() };
    partner.email = 'invalid';
    await expect(() =>
      service.update(partner.id, partner),
    ).rejects.toHaveProperty('message', 'The email address is invalid');
  });

  it('update should throw an exception for an invalid partner', async () => {
    const partner: PartnerEntity = { ...partnersList[0], ...mockPartner() };
    await expect(() => service.update('0', partner)).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });

  it('delete should remove a partner', async () => {
    const partner: PartnerEntity = partnersList[0];
    await service.delete(partner.id);
    const deletedPartner: PartnerEntity = await repository.findOne({
      where: { id: partner.id },
    });
    expect(deletedPartner).toBeNull();
  });

  it('delete should throw an exception for an invalid partner', async () => {
    const partner: PartnerEntity = partnersList[0];
    await service.delete(partner.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });
});
