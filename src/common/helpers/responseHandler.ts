import { Response } from 'express';

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
  pagination?: Record<string, any>;
  statusCode?: number;
}

class ResponseHandler {
  static success<T>(res: Response, responseData: ApiResponse<T>): void {
    const defaultResponse: ApiResponse<T> = {
      success: true,
      message: 'Success',
      data: {} as T,
    };

    const { statusCode = 200, ...response }: ApiResponse<T> = responseData;
    res.status(statusCode).json({ ...defaultResponse, ...response });
  }

  static throwError(message = 'An error occurred', status = 500): never {
    throw { message, status };
  }

  static error(res: Response, message = 'Error', status = 500): void {
    res.status(status).json({
      success: false,
      message,
      data: null,
    });
  }

  static sendBadRequestError(
    res: Response,
    message = 'Bad Request',
    data?: Record<string, any>
  ) {
    res.status(400).json({ success: false, message, data });
  }

  static sendForbiddenError(res: Response, message = 'Not Allowed') {
    res.status(403).json({ success: false, message });
  }

  static sendNotFoundError(res: Response, message = 'Not found') {
    res.status(404).json({ success: false, message });
  }
}

export default ResponseHandler;
