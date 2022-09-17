import { ClubEntity } from 'src/club/club.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

// Cree la entidad Socio en el módulo correspondiente.
// Un socio tiene un nombre de usuario,
// un correo electrónico y una fecha de nacimiento.

@Entity()
export class PartnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @ManyToMany(() => ClubEntity, (club) => club.partners)
  clubs: ClubEntity[];
}
