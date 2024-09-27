import { CreateMeasurementDto } from '@src/modules/measurement/dto/create-measurement.dto';
import { Measurement } from '@src/modules/measurement/entities/Measurement';
import { AppDataSource } from '../data-source';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

class MeasurementRepository {
  constructor(
    private readonly measurement: typeof Measurement,
    private readonly dataSource: typeof AppDataSource
  ) {
    Object.assign(this, measurement, dataSource);
  }

  async create(measurement: CreateMeasurementDto) {
    const newMeasurement = new this.measurement();
    Object.assign(newMeasurement, measurement);

    return await newMeasurement.save();
  }

  async createMany(measurements: CreateMeasurementDto[]) {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const measurementsValues = measurements.map((measurement) => {
        return transactionalEntityManager.create(Measurement, {
          ...measurement,
          equipment: measurement.equipmentId as DeepPartial<Measurement>,
        });
      });

      await transactionalEntityManager.save(measurementsValues)
    });
  }

  async findManyByFilter(filter: FindOptionsWhere<Measurement>) {
    return  await this.measurement
    .createQueryBuilder('measurement')
    .select('measurement.equipmentId', 'equipmentId')
    .addSelect('AVG(measurement.value)', 'value')
    .where(filter)
    .groupBy('measurement.equipmentId')
    .getRawMany();
  }
}

export default new MeasurementRepository(Measurement, AppDataSource);
