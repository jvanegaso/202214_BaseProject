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
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { ClubDTO } from './club.dto';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

// Cree la clase del controlador para Club,
// agregue la ruta /clubs y defina los endpoints
// findAll, findOne, create, update y delete
// con sus respectivas anotaciones.

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  async findAll() {
    return await this.clubService.findAll();
  }

  @Get(':clubId')
  async findOne(@Param('clubId') clubId: string) {
    return await this.clubService.findOne(clubId);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() clubDTO: ClubDTO) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDTO);
    return await this.clubService.create(club);
  }

  @Put(':clubId')
  async update(@Param('clubId') clubId: string, @Body() clubDTO: ClubDTO) {
    const club: ClubEntity = plainToInstance(ClubEntity, clubDTO);
    return await this.clubService.update(clubId, club);
  }

  @Delete(':clubId')
  @HttpCode(204)
  async delete(@Param('clubId') clubId: string) {
    return await this.clubService.delete(clubId);
  }
}
