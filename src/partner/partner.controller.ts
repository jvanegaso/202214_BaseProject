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
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PartnerDTO } from './partner.dto';
import { PartnerEntity } from './partner.entity';
import { PartnerService } from './partner.service';

// Cree la clase del controlador para Socio,
// agregue la ruta /members y defina los endpoints
// findAll, findOne, create, update y delete
// con sus respectivas anotaciones.

@Controller('members')
@UseInterceptors(BusinessErrorsInterceptor)
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  async findAll() {
    return await this.partnerService.findAll();
  }

  @Get(':memberId')
  async findOne(@Param('memberId') memberId: string) {
    return await this.partnerService.findOne(memberId);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() partnerDTO: PartnerDTO) {
    const partner: PartnerEntity = plainToInstance(PartnerEntity, partnerDTO);
    return await this.partnerService.create(partner);
  }

  @Put(':memberId')
  async update(
    @Param('memberId') memberId: string,
    @Body() partnerDTO: PartnerDTO,
  ) {
    const partner: PartnerEntity = plainToInstance(PartnerEntity, partnerDTO);
    return await this.partnerService.update(memberId, partner);
  }

  @Delete(':memberId')
  @HttpCode(204)
  async delete(@Param('memberId') memberId: string) {
    return await this.partnerService.delete(memberId);
  }
}
