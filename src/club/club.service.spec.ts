import { Test, TestingModule } from '@nestjs/testing';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockClub } from 'src/shared/testing-utils/mockers';

describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<ClubEntity>;
  let clubsList: ClubEntity[];

  const seedDatabase = async () => {
    repository.clear();
    clubsList = [];
    for (let i = 0; i < 5; i++) {
      const club: ClubEntity = await repository.save(mockClub());
      clubsList.push(club);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<ClubEntity>>(
      getRepositoryToken(ClubEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all clubs', async () => {
    const clubs: ClubEntity[] = await service.findAll();
    expect(clubs).not.toBeNull();
    expect(clubs).toHaveLength(clubsList.length);
  });

  it('findOne should return a club by id', async () => {
    const storedClub: ClubEntity = clubsList[0];
    const club: ClubEntity = await service.findOne(storedClub.id);
    expect(club).not.toBeNull();
    expect(club.name).toEqual(storedClub.name);
    expect(club.foundation).toEqual(storedClub.foundation);
    expect(club.description).toEqual(storedClub.description);
    expect(club.image).toEqual(storedClub.image);
  });

  it('findOne should throw an exception for an invalid club', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('create should return a new club', async () => {
    const club: ClubEntity = mockClub();
    const newClub: ClubEntity = await service.create(club);
    expect(newClub).not.toBeNull();

    const storedClub: ClubEntity = await repository.findOne({
      where: { id: newClub.id },
    });
    expect(storedClub).not.toBeNull();
    expect(club.name).toEqual(storedClub.name);
    expect(club.foundation).toEqual(storedClub.foundation);
    expect(club.description).toEqual(storedClub.description);
    expect(club.image).toEqual(storedClub.image);
  });

  it('create should throw an exception for an description', async () => {
    const club: ClubEntity = mockClub();
    club.description = faker.lorem.words(100);
    await expect(() => service.create(club)).rejects.toHaveProperty(
      'message',
      'The description must be shorten than 100 characters',
    );
  });

  it('update should modify a club', async () => {
    const club: ClubEntity = { ...clubsList[0], ...mockClub() };
    const updatedClub: ClubEntity = await service.update(club.id, club);
    expect(updatedClub).not.toBeNull();
    const storedPartner: ClubEntity = await repository.findOne({
      where: { id: club.id },
    });
    expect(storedPartner).not.toBeNull();
    expect(storedPartner.name).toEqual(updatedClub.name);
    expect(storedPartner.foundation).toEqual(updatedClub.foundation);
    expect(storedPartner.description).toEqual(updatedClub.description);
    expect(storedPartner.image).toEqual(updatedClub.image);
  });

  it('update should throw an exception for an invalid description', async () => {
    const club: ClubEntity = { ...clubsList[0], ...mockClub() };
    club.description = faker.lorem.words(100);
    await expect(() => service.update(club.id, club)).rejects.toHaveProperty(
      'message',
      'The description must be shorten than 100 characters',
    );
  });

  it('update should throw an exception for an invalid club', async () => {
    const club: ClubEntity = { ...clubsList[0], ...mockClub() };
    await expect(() => service.update('0', club)).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('delete should remove a club', async () => {
    const club: ClubEntity = clubsList[0];
    await service.delete(club.id);
    const deletedClub: ClubEntity = await repository.findOne({
      where: { id: club.id },
    });
    expect(deletedClub).toBeNull();
  });

  it('delete should throw an exception for an invalid club', async () => {
    const club: ClubEntity = clubsList[0];
    await service.delete(club.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });
});
