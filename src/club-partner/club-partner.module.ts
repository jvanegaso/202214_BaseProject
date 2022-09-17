import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity';
import { PartnerEntity } from '../partner/partner.entity';
import { ClubPartnerService } from './club-partner.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, PartnerEntity])],
  providers: [ClubPartnerService],
})
export class ClubPartnerModule {}
