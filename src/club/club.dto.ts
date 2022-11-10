import { IsNotEmpty, IsString } from 'class-validator';

export class ClubDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly foundation: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
