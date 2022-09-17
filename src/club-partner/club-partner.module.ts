import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity';
import { PartnerEntity } from '../partner/partner.entity';
import { ClubPartnerService } from './club-partner.service';
import { ClubPartnerController } from './club-partner/club-partner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, PartnerEntity])],
  providers: [ClubPartnerService],
  controllers: [ClubPartnerController],
})
export class ClubPartnerModule {}
