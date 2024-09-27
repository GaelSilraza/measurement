import { IsOptional, IsUUID, MaxLength } from 'class-validator';
import { CreateMeasurementDto } from './create-measurement.dto';

export class UpdateMeasurementDto extends CreateMeasurementDto {
  @IsOptional()
  @IsUUID()
  @MaxLength(12)
  id!: string;
}
