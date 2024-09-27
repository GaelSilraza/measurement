import 'express';

declare global {
  namespace Express {
    interface Request {
      pagination?: {
        limit: number;
        page: number;
        from?: Date;
        to?: Date;
      };
    }
  }
}
