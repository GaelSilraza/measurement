import csvParser from 'csv-parser';
import { Readable } from 'stream';

export interface CsvData {
  [key: string]: string | number;
}

export const parseCsv = async (fileBuffer: Buffer): Promise<CsvData[]> => {
  return new Promise((resolve, reject) => {
    const results: CsvData[] = [];
    const readable = new Readable();
    readable.push(fileBuffer);
    readable.push(null);

    readable
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};