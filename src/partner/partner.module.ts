import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerEntity } from './partner.entity';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';

@Module({
  providers: [PartnerService],
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
  controllers: [PartnerController],
})
export class PartnerModule {}
