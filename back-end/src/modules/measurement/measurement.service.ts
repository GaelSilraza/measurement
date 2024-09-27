import { CreateMeasurementDto } from './dto/create-measurement.dto';
import MeasurementRepository from '@src/infra/database/repositories/measurement.repositories';
import { Measurement } from './entities/Measurement';
import { parseCsv } from '@src/shared/utils/files';
import { FindOptionsWhere } from 'typeorm';

class MeasurementService {
  constructor(private readonly repository: typeof MeasurementRepository) {
    Object.assign(this, repository);
  }

  async create(measurementDto: CreateMeasurementDto | CreateMeasurementDto[]) {
    if (Array.isArray(measurementDto)) {
      return await this.createMany(measurementDto);
    }

    return await this.repository.create(measurementDto);
  }

  async createMany(measurementDto: CreateMeasurementDto[]) {
    return await this.repository.createMany(measurementDto);
  }

  async parseCSVMeasurementData(file: Express.Multer.File) {
    return await parseCsv(file.buffer) as unknown as CreateMeasurementDto[];
  }

  async findMany(filter: FindOptionsWhere<Measurement>) {
    return await this.repository.findManyByFilter(filter);
  }
}

export default new MeasurementService(MeasurementRepository);
