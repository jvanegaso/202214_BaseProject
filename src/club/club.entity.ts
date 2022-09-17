import { PartnerEntity } from 'src/partner/partner.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Cree la entidad Club en el módulo correspondiente.
// Un club tiene un nombre, una fecha de fundación,
// una imagen y una descripción de no más de 100 caracteres.

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  foundationDate: Date;

  @Column()
  image: string;

  @Column({ length: 100 })
  description: string;

  @ManyToMany(() => PartnerEntity, (partner) => partner.clubs)
  @JoinTable()
  partners: PartnerEntity[];
}
