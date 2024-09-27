import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMeasurementDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  equipmentId!: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  timestamp!: string;

  @IsNotEmpty()
  @IsNumber()
  value!: number;
}
