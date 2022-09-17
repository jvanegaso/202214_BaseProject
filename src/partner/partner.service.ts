import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { msgs } from '../shared/constants/constants';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { validateEmail } from '../shared/util/validators';
import { Repository } from 'typeorm';
import { PartnerEntity } from './partner.entity';

// Defina la lógica de Socio, esta debe
// incluir los métodos findAll, findOne, create, update y delete.
// Dentro de los métodos create y update,
// realice una validación básica del correo electrónico,
// es decir que tenga el caracter ‘@’.

const relations = ['clubs'];

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
  ) {}

  async findAll(): Promise<PartnerEntity[]> {
    return await this.partnerRepository.find({ relations });
  }

  async findOne(id: string): Promise<PartnerEntity> {
    const partner: PartnerEntity = await this.partnerRepository.findOne({
      where: { id },
      relations,
    });
    if (!partner)
      throw new BusinessLogicException(
        msgs.PARTNER_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    return partner;
  }

  async create(partner: PartnerEntity): Promise<PartnerEntity> {
    if (!validateEmail(partner.email)) {
      throw new BusinessLogicException(
        msgs.EMAIL_ERROR,
        BusinessError.INVALID_DATA,
      );
    }
    return await this.partnerRepository.save(partner);
  }

  async update(id: string, partner: PartnerEntity): Promise<PartnerEntity> {
    if (!validateEmail(partner.email)) {
      throw new BusinessLogicException(
        msgs.EMAIL_ERROR,
        BusinessError.INVALID_DATA,
      );
    }

    const persistedPartner: PartnerEntity =
      await this.partnerRepository.findOne({ where: { id } });
    if (!persistedPartner)
      throw new BusinessLogicException(
        msgs.PARTNER_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    return await this.partnerRepository.save({
      ...persistedPartner,
      ...partner,
    });
  }

  async delete(id: string) {
    const partner: PartnerEntity = await this.partnerRepository.findOne({
      where: { id },
    });
    if (!partner)
      throw new BusinessLogicException(
        msgs.PARTNER_NOT_FOUND,
        BusinessError.NOT_FOUND,
      );

    await this.partnerRepository.remove(partner);
  }
}
