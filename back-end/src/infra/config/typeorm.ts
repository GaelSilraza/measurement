import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

import { basePath } from '../../shared/utils/module-alias';
import { Equipment } from '@src/modules/equipment/entities/Equipment';
import { Measurement } from '@src/modules/measurement/entities/Measurement';

export const typeorm: DataSourceOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV?.toLowerCase() === 'development',
  entities: [Equipment, Measurement],
  migrations: [`${basePath}/src/infra/database/migrations/*.ts`],
  subscribers: [],
};
