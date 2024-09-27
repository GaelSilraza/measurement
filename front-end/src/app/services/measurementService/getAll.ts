import { httpClient } from '../../../providers/httpClient';
import { Measurement } from '../../entities/Measurement';

export type TransactionFilters = {
  interval: string;
}

export const getAll = async (filters: TransactionFilters) => {
  const targetDate = new Date();

  const interval = filters.interval.toLowerCase();

  switch (interval) {
    case '1d':
      targetDate.setDate(targetDate.getDate() - 1);
      break;
    case '2d':
      targetDate.setDate(targetDate.getDate() - 1);
      break;
    case '1w':
      targetDate.setDate(targetDate.getDate() - 7);
      break;
    case '1m':
      targetDate.setDate(targetDate.getMonth() - 1);
      break;
  }

  return await httpClient.get<Array<Measurement>>('/measurement/', {
    params: {
      to: targetDate,
      from: new Date(),
    },
  })
}