import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { msgs } from '../shared/constants/constants';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { hasValidLength } from '../shared/util/validators';
import { Repository } from 'typeorm';
import { ClubEntity } from './club.entity';

// Defina la lógica de Club,
// esta debe incluir los métodos
// findAll, findOne, create, update y delete.
// Dentro de los métodos create y update,
// valide que la descripción no supere el máximo de caracteres permitidos.

const relations = ['partners'];
const DESCRIPTION_MAX_LENGTH = 100;

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find({ relations });
  }

  async findOne(id: string): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
      relations,
    });
    if (!club)
      throw new BusinessLogicException(
        msgs.CLUB_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    return club;
  }

  async create(club: ClubEntity): Promise<ClubEntity> {
    if (!hasValidLength(club.description, DESCRIPTION_MAX_LENGTH)) {
      throw new BusinessLogicException(
        msgs.DESCRIPTION_ERROR,
        BusinessError.INVALID_DATA,
      );
    }
    return await this.clubRepository.save(club);
  }

  async update(id: string, club: ClubEntity): Promise<ClubEntity> {
    if (!hasValidLength(club.description, DESCRIPTION_MAX_LENGTH)) {
      throw new BusinessLogicException(
        msgs.DESCRIPTION_ERROR,
        BusinessError.INVALID_DATA,
      );
    }

    const persistedClub: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });
    if (!persistedClub)
      throw new BusinessLogicException(
        msgs.CLUB_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    return await this.clubRepository.save({ ...persistedClub, ...club });
  }

  async delete(id: string) {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
    });
    if (!club)
      throw new BusinessLogicException(
        msgs.CLUB_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    await this.clubRepository.remove(club);
  }
}
