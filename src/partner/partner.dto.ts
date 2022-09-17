import { IsNotEmpty, IsString } from 'class-validator';
export class PartnerDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly birthday: Date;

  @IsString()
  @IsNotEmpty()
  readonly email: string;
}
