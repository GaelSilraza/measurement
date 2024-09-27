import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEquipmentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name!: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;
}
