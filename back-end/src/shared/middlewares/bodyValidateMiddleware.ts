import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const bodyValiteMiddleware = <T extends object>(
  type: new () => T
): RequestHandler => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const dtoObject = plainToInstance(type, request.body);

      validate(dtoObject).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const customizedError = errors.map((error) => {
            return {
              [error.property]: { ...error.constraints },
            };
          });

          response.status(400).json(customizedError);
          return;
        }

        request.body = dtoObject;
        next();
      });
    } catch (error) {
      response.send(500).json({ message: 'Internal server erro' });
    }
  };
};
