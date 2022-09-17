import { faker } from '@faker-js/faker';
import { ClubEntity } from '../../club/club.entity';
import { PartnerEntity } from '../../partner/partner.entity';

export const mockPartner = () => {
  const mockedPartner: PartnerEntity = new PartnerEntity();
  mockedPartner.name = faker.name.fullName();
  mockedPartner.email = faker.internet.email();
  mockedPartner.birthday = faker.date.birthdate().toString();
  mockedPartner.clubs = [];
  return mockedPartner;
};

export const mockClub = () => {
  const mockedClub: ClubEntity = new ClubEntity();
  mockedClub.name = faker.company.name();
  mockedClub.description = faker.lorem.text().substring(0, 99);
  mockedClub.foundation = faker.date.past().toString();
  mockedClub.image = faker.internet.avatar();
  mockedClub.partners = [];
  return mockedClub;
};
