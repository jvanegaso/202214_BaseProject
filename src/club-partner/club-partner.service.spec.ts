import { Test, TestingModule } from '@nestjs/testing';
import { ClubEntity } from '../club/club.entity';
import { PartnerEntity } from '../partner/partner.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ClubPartnerService } from './club-partner.service';
import { mockClub, mockPartner } from '../shared/testing-utils/mockers';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClubPartnerService', () => {
  let service: ClubPartnerService;
  let clubRepository: Repository<ClubEntity>;
  let partnerRepository: Repository<PartnerEntity>;
  let club: ClubEntity;
  let partnersList: PartnerEntity[];

  const seedDatabase = async () => {
    clubRepository.clear();
    partnerRepository.clear();

    partnersList = [];
    const newClub = mockClub();

    for (let i = 0; i < 5; i++) {
      const newPartner = mockPartner();
      const partner: PartnerEntity = await partnerRepository.save(newPartner);
      partnersList.push(partner);
    }

    newClub.partners = partnersList;
    club = await clubRepository.save(newClub);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubPartnerService],
    }).compile();

    service = module.get<ClubPartnerService>(ClubPartnerService);
    clubRepository = module.get<Repository<ClubEntity>>(
      getRepositoryToken(ClubEntity),
    );
    partnerRepository = module.get<Repository<PartnerEntity>>(
      getRepositoryToken(PartnerEntity),
    );

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addMemberToClub should add a partner to a club', async () => {
    const partner: PartnerEntity = await partnerRepository.save(mockPartner());
    const newClub: ClubEntity = await clubRepository.save(mockClub());

    const result: ClubEntity = await service.addMemberToClub(
      newClub.id,
      partner.id,
    );

    expect(result.partners.length).toBe(1);
    expect(result.partners[0]).not.toBeNull();
    expect(result.partners[0].name).toBe(partner.name);
    expect(result.partners[0].birthdate).toEqual(partner.birthdate);
    expect(result.partners[0].email).toBe(partner.email);
  });

  it('addMemberToClub should thrown exception for an invalid partner', async () => {
    const newClub: ClubEntity = await clubRepository.save(mockClub());

    await expect(() =>
      service.addMemberToClub(newClub.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });

  it('addMemberToClub should throw an exception for an invalid club', async () => {
    const newPartner: PartnerEntity = await partnerRepository.save(
      mockPartner(),
    );

    await expect(() =>
      service.addMemberToClub('0', newPartner.id),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('findMembersFromClub should return partners by club', async () => {
    const partners: PartnerEntity[] = await service.findMembersFromClub(
      club.id,
    );
    expect(partners.length).toBe(5);
  });

  it('findMembersFromClub should throw an exception for an invalid club', async () => {
    await expect(() => service.findMembersFromClub('0')).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('findMemberFromClub should return partners by club', async () => {
    const partner: PartnerEntity = partnersList[0];
    const storedPartner: PartnerEntity = await service.findMemberFromClub(
      club.id,
      partner.id,
    );
    expect(storedPartner).not.toBeNull();
    expect(storedPartner.name).toBe(partner.name);
    expect(storedPartner.email).toBe(partner.email);
    expect(storedPartner.birthdate).toEqual(partner.birthdate);
  });

  it('findMemberFromClub should throw an exception for an invalid partner', async () => {
    await expect(() =>
      service.findMemberFromClub(club.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });

  it('findMemberFromClub should throw an exception for an invalid club', async () => {
    const partner: PartnerEntity = partnersList[0];
    await expect(() =>
      service.findMemberFromClub('0', partner.id),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('findMemberFromClub should throw an exception for a partner not associated to the club', async () => {
    const partner: PartnerEntity = await partnerRepository.save(mockPartner());

    await expect(() =>
      service.findMemberFromClub(club.id, partner.id),
    ).rejects.toHaveProperty(
      'message',
      'The member does not belong to the club',
    );
  });

  it('updateMembersFromClub should update partners list for a club', async () => {
    const partner: PartnerEntity = await partnerRepository.save(mockPartner());

    const updatedClub: ClubEntity = await service.updateMembersFromClub(
      club.id,
      [partner],
    );
    expect(updatedClub.partners.length).toBe(1);

    expect(updatedClub.partners[0].name).toBe(partner.name);
    expect(updatedClub.partners[0].birthdate).toEqual(partner.birthdate);
    expect(updatedClub.partners[0].email).toBe(partner.email);
  });

  it('updateMembersFromClub should throw an exception for an invalid club', async () => {
    const newPartner: PartnerEntity = await partnerRepository.save(
      mockPartner(),
    );

    await expect(() =>
      service.updateMembersFromClub('0', [newPartner]),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('updateMembersFromClub should throw an exception for an invalid partner', async () => {
    const newPartner: PartnerEntity = partnersList[0];
    newPartner.id = '0';

    await expect(() =>
      service.updateMembersFromClub(club.id, [newPartner]),
    ).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });

  it('deleteMemberFromClub should remove a partner from a club', async () => {
    const partner: PartnerEntity = partnersList[0];

    await service.deleteMemberFromClub(club.id, partner.id);

    const storedclub: ClubEntity = await clubRepository.findOne({
      where: { id: club.id },
      relations: ['partners'],
    });
    const deletedPartner: PartnerEntity = storedclub.partners.find(
      (a) => a.id === partner.id,
    );

    expect(deletedPartner).toBeUndefined();
  });

  it('deleteMemberFromClub should thrown an exception for an invalid partner', async () => {
    await expect(() =>
      service.deleteMemberFromClub(club.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The member with the given id was not found',
    );
  });

  it('deleteMemberFromClub should thrown an exception for an invalid club', async () => {
    const partner: PartnerEntity = partnersList[0];
    await expect(() =>
      service.deleteMemberFromClub('0', partner.id),
    ).rejects.toHaveProperty(
      'message',
      'The club with the given id was not found',
    );
  });

  it('deleteMemberFromClub should thrown an exception for an non asocciated partner', async () => {
    const newPartner: PartnerEntity = await partnerRepository.save(
      mockPartner(),
    );

    await expect(() =>
      service.deleteMemberFromClub(club.id, newPartner.id),
    ).rejects.toHaveProperty(
      'message',
      'The member does not belong to the club',
    );
  });
});
