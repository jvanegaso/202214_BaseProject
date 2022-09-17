import { IsNotEmpty, IsString } from 'class-validator';
export class PartnerDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly birthday: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;
}
