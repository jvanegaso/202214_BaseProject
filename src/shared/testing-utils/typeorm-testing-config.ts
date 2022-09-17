import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../../club/club.entity';
import { PartnerEntity } from '../../partner/partner.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [PartnerEntity, ClubEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([PartnerEntity, ClubEntity]),
];
