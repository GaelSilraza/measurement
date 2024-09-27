import { Request, Response, NextFunction } from 'express';

export const paginationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let limit = parseInt(request.query.limit as string) || 10;
  const page = parseInt(request.query.page as string) || 1;

  limit = limit > 100 ? 50 : 10;

  request.pagination = {
    limit,
    page,
  };

  const from = request.query.from as string;
  const to = request.query.to as string;

  if (from && to) {
    try {
      request.pagination = {
        ...request.pagination,
        from: new Date(from),
        to: new Date(to),
      };
    } catch (error) {
      console.log(error);
    }
  }
  
  next();
};
