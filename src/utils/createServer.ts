import httpStatus from 'http-status';
//app.ts
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from '../app/middlewares/globalErrorHandler';
import routes from '../app/routes';
function createServer() {
  const app: Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use('/api/v1', routes);
  //global error handler
  app.use(globalErrorHandler);

  //handle not found
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API Not Found',
        },
      ],
    });
    next();
  });
  return app;
}

export default createServer;
