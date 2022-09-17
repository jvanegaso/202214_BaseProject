import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerEntity } from './partner.entity';
import { PartnerService } from './partner.service';

@Module({
  providers: [PartnerService],
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
})
export class PartnerModule {}
