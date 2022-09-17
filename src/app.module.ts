import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnerModule } from './partner/partner.module';
import { ClubModule } from './club/club.module';

@Module({
  imports: [PartnerModule, ClubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
