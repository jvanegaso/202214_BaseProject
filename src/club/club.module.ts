import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';

@Module({
  providers: [ClubService],
  imports: [TypeOrmModule.forFeature([ClubEntity])],
  controllers: [ClubController],
})
export class ClubModule {}
