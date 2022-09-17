import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';
import { ClubModule } from './club/club.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerEntity } from './partner/partner.entity';
import { ClubEntity } from './club/club.entity';
import { ClubPartnerModule } from './club-partner/club-partner.module';

@Module({
  imports: [
    PartnerModule,
    ClubModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial2',
      entities: [PartnerEntity, ClubEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    ClubPartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
