import { Controller, Get, HttpStatus } from '@nestjs/common';
import { sendResponse } from 'src/helpers/response.helper';

@Controller('products')
export class ProductController {
  constructor() {}

  @Get()
  findAll() {
    return sendResponse({
      status_code: HttpStatus.OK,
      message: 'All products',
    });
  }
}
