import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity';
import { PartnerEntity } from '../partner/partner.entity';
import { msgs } from '../shared/constants/constants';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
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

  async addMemberToClub(
    clubId: string,
    partnerId: string,
  ): Promise<ClubEntity> {
    const partner: PartnerEntity = await this.partnerRepository.findOne({
      where: { id: partnerId },
    });
    if (!partner)
      throw new BusinessLogicException(
        msgs.PARTNER_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['partners'],
    });
    if (!club)
      throw new BusinessLogicException(
        msgs.CLUB_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    club.partners = [...club.partners, partner];
    return await this.clubRepository.save(club);
  }

  async findMembersFromClub(clubId: string): Promise<PartnerEntity[]> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['partners'],
    });
    if (!club)
      throw new BusinessLogicException(
        msgs.CLUB_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    return club.partners;
  }

  async findMemberFromClub(
    clubId: string,
    partnerId: string,
  ): Promise<PartnerEntity> {
    const partner: PartnerEntity = await this.partnerRepository.findOne({
      where: { id: partnerId },
      relations: ['clubs'],
    });
    if (!partner)
      throw new BusinessLogicException(
        msgs.PARTNER_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['partners'],
    });
    if (!club)
      throw new BusinessLogicException(
        msgs.CLUB_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    const clubMember: PartnerEntity = club.partners.find(
      (p) => p.id === partnerId,
    );

    if (!clubMember)
      throw new BusinessLogicException(
        msgs.MEMBER_NOT_IN_CLUB,
        BusinessError.PRECONDITION_FAILED,
      );

    return clubMember;
  }

  async updateMembersFromClub(
    clubId: string,
    partners: PartnerEntity[],
  ): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['partners'],
    });

    if (!club) {
      throw new BusinessLogicException(
        msgs.CLUB_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );
    }

    for (const element of partners) {
      const partner: PartnerEntity = await this.partnerRepository.findOne({
        where: { id: element.id },
      });
      if (!partner) {
        throw new BusinessLogicException(
          msgs.PARTNER_NOT_FOUND,
          BusinessError.NOT_FOUND,
        );
      }
    }

    club.partners = partners;
    return this.clubRepository.save(club);
  }

  async deleteMemberFromClub(clubId: string, partnerId: string) {
    const partner: PartnerEntity = await this.partnerRepository.findOne({
      where: { id: partnerId },
    });
    if (!partner) {
      throw new BusinessLogicException(
        msgs.PARTNER_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );
    }

    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['partners'],
    });
    if (!club) {
      throw new BusinessLogicException(
        msgs.CLUB_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );
    }

    const clubPartner: PartnerEntity = club.partners.find(
      (e) => e.id === partner.id,
    );

    if (!clubPartner) {
      throw new BusinessLogicException(
        msgs.MEMBER_NOT_IN_CLUB,
        BusinessError.PRECONDITION_FAILED,
      );
    }

    club.partners = club.partners.filter((e) => e.id !== partnerId);
    await this.clubRepository.save(club);
  }
}
