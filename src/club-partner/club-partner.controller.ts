import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PartnerDTO } from 'src/partner/partner.dto';
import { PartnerEntity } from 'src/partner/partner.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { ClubPartnerService } from './club-partner.service';

// Cree la clase del controlador para la asociación
// Club-Socio, agregue la ruta de modo que se
// acceda a los endpoints a través del club
// (ej. /clubs/1/members/4 para findMemberFromClub)
// e implemente los endpoints:
// addMemberToClub
// findMembersFromClub
// findMemberFromClub
// updateMembersFromClub
// deleteMemberFromClub

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubPartnerController {
  constructor(private readonly clubPartnerService: ClubPartnerService) {}

  @Post(':clubId/members/:memberId')
  async addMemberToClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubPartnerService.addMemberToClub(clubId, memberId);
  }

  @Get(':clubId/members')
  async findMembersFromClub(@Param('clubId') clubId: string) {
    return await this.clubPartnerService.findMembersFromClub(clubId);
  }

  @Get(':clubId/members/:memberId')
  async findMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubPartnerService.findMemberFromClub(clubId, memberId);
  }

  @Put(':clubId/members')
  async updateMembersFromClub(
    @Body() partnerDTO: PartnerDTO[],
    @Param('clubId') clubId: string,
  ) {
    const partners = plainToInstance(PartnerEntity, partnerDTO);
    return await this.clubPartnerService.updateMembersFromClub(
      clubId,
      partners,
    );
  }

  @Delete(':clubId/members/:memberId')
  @HttpCode(204)
  async deleteMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('memberId') memberId: string,
  ) {
    return await this.clubPartnerService.deleteMemberFromClub(clubId, memberId);
  }
}
