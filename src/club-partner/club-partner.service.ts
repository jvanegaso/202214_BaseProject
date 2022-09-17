import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from 'src/club/club.entity';
import { PartnerEntity } from 'src/partner/partner.entity';
import { Repository } from 'typeorm';

// Defina la lógica de la asociación, esta debe incluir 5 métodos con las siguientes acciones:
// addMemberToClub: Asociar un socio a un grupo.
// findMembersFromClub: Obtener los socios de un grupo.
// findMemberFromClub: Obtener un socio de un grupo.
// updateMembersFromClub: Actualizar los socios de un grupo.
// deleteMemberFromClub: Eliminar un socio de un grupo.

@Injectable()
export class ClubPartnerService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,

    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
  ) {}
}
