import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { typeorm } from '../config/typeorm';

export const AppDataSource = new DataSource(typeorm);