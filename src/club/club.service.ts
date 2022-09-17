import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubEntity } from './club.entity';

// Defina la lógica de Club,
// esta debe incluir los métodos
// findAll, findOne, create, update y delete.
// Dentro de los métodos create y update,
// valide que la descripción no supere el máximo de caracteres permitidos.

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}
}
