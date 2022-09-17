import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@Module({
  providers: [ClubService],
  imports: [TypeOrmModule.forFeature([ClubEntity])],
})
export class ClubModule {}
