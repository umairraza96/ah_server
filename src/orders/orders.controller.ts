import { Controller, Get, HttpStatus } from '@nestjs/common';
import { sendResponse } from 'src/helpers/response.helper';

@Controller('orders')
export class OrderController {
  constructor() {}

  @Get()
  findAll() {
    return sendResponse({
      status_code: HttpStatus.OK,
      message: 'All orders',
    });
  }
}
