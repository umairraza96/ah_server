import { HttpStatus } from '@nestjs/common';
import { MessageKey, MessageValue } from './response.message';

// interface <T> {
//     status_code: number;
//     data?: T;
//     message: string;
//     error?: string;
//   }

interface ISendResponse<T> {
  status_code: HttpStatus;
  data?: T;
  message: MessageValue;
  error?: string;
}

export const sendResponse = <T>({
  status_code,
  data,
  message,
  error,
}: ISendResponse<T>) => {
  // if data is not null, return response with data
  if (data) {
    return {
      statusCode: status_code,
      data,
      message,
    };
  } else if (error) {
    return {
      statusCode: status_code,
      message,
      error,
    };
  } else {
    return {
      statusCode: status_code,
      message,
    };
  }
};
