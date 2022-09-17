import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from 'src/club/club.entity';
import { PartnerEntity } from 'src/partner/partner.entity';
import { ClubPartnerService } from './club-partner.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, PartnerEntity])],
  providers: [ClubPartnerService],
})
export class ClubPartnerModule {}
