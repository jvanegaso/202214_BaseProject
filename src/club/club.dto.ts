import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class ClubDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly foundation: Date;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  readonly description: string;
}
