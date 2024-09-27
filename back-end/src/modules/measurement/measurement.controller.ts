import { Request, Response } from 'express';

import MeasurementService from './measurement.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { toResultAsync, toResultSync } from '@src/shared/utils/patterns';
import { Between } from 'typeorm';

class MeasurementController {
  constructor(private readonly measurementService: typeof MeasurementService) {}

  public create = async (request: Request, response: Response) => {
    const measurement: CreateMeasurementDto[] | CreateMeasurementDto =
      request.body;

    const [error] = await toResultAsync(
      this.measurementService.create(measurement)
    );

    if (error) {
      return response.status(400).json({ message: 'Invalid body data.' });
    }

    return response.status(201).json();
  };

  public extractCsv = async (request: Request, response: Response) => {
    const files = request.files;
    const hasFiles = Array.isArray(files) && files?.length > 0;

    if (!hasFiles) {
      return response.status(400).json({ message: 'No file uploaded.' });
    }

    const allowedMimeTypes = ['text/csv', 'application/csv'];

    const [error, csvPromises] = toResultSync(
      files.map(
        async (
          file: Express.Multer.File
        ): Promise<void | CreateMeasurementDto[]> => {
          if (allowedMimeTypes.includes(file.mimetype)) {
            return await this.measurementService.parseCSVMeasurementData(file);
          }
        }
      )
    );

    if (error) {
      return response
        .status(400)
        .json({ message: 'Error to parse your csv file' });
    }

    const parsedData = (
      await Promise.all(csvPromises as unknown as CreateMeasurementDto[])
    ).flat();

    const [errorToCreateMeasurements] = await toResultAsync(
      this.measurementService.createMany(parsedData)
    );

    if (errorToCreateMeasurements) {
      return response
        .status(400)
        .json({ message: 'Some data looks wrong in your file.' });
    }

    return response.status(201).json();
  };

  public findMany = async (request: Request, response: Response) => {
    const currentTime = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const targetTime = (request.pagination?.to || sevenDaysAgo) as Date;

    const [error, result] = await toResultAsync(
      this.measurementService.findMany({
        timestamp: Between(targetTime, currentTime),
      })
    );

    if (error) {
      response.status(400).json({ message: 'Error to filter your results' });
    }

    return response.status(200).json(result);
  };
}

export default new MeasurementController(MeasurementService);
