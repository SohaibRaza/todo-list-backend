import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '~/common/helpers/customErrors';
import ResponseHandler from '~/common/helpers/responseHandler';

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof NotFoundError) {
    ResponseHandler.sendNotFoundError(res, error.message);
  } else if (error instanceof BadRequestError) {
    res.status(400).json({ error: error.message });
  } else if (error.code === 11000) {
    const duplicateKeyErrorMessage = error.message.match(/dup key: { ([^:]+):/);
    const duplicateKey = duplicateKeyErrorMessage
      ? duplicateKeyErrorMessage[1]
      : 'unknown';

    const errorMessage = `Duplicate value for key: ${duplicateKey}`;
    ResponseHandler.sendBadRequestError(res, errorMessage);
  } else if (error.name === 'ValidationError') {
    const validationErrors = error.errors;
    const errorMessages = [];

    for (const key in validationErrors) {
      if (validationErrors.hasOwnProperty(key)) {
        if (validationErrors[key].kind === 'required') {
          errorMessages.push(`${key} is required`);
        }
      }
    }
    console.log('Validation Error', errorMessages);
    ResponseHandler.sendBadRequestError(res, 'Validation Error', errorMessages);
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default errorHandler;
